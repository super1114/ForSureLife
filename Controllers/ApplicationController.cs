using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ForSureLife.biz.Interfaces;
using ForSureLife.Models.DTO;
using ForSureLife.Models.Enums;
using ForSureLife.repo;
using ForSureLife.repo.Models.Quote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using ForSureLife.Models.ErrorHandling;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Authorize]
    [Route("")]
    [ApiController]
    public class ApplicationController : BaseController
    {

        private readonly ILogger _logger;
        private readonly IConfiguration _config;
        public IApplicationManager _applicationManager { get; set; }
        public IApplicationInfoManager _applicationInfoManager { get; set; }
        public IFamilyOrBeneficiaryManager _familyOrBeneficiaryManager { get; set; }
        public IMapper _mapper { get; set; }
        public ApplicationController(IConfiguration config, IApplicationManager applicationManager, IApplicationInfoManager applicationInfoManager, IFamilyOrBeneficiaryManager familyOrBeneficiaryManager, IMapper mapper, ILoggerFactory logFactory)
        {
            _logger = logFactory.CreateLogger<LeadController>();
            _applicationManager = applicationManager;
            _mapper = mapper;
            _applicationInfoManager = applicationInfoManager;
            _familyOrBeneficiaryManager = familyOrBeneficiaryManager;
            _config = config;

        }
        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="applicationId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationDto), StatusCodes.Status200OK)]
        [Route("api/Application", Name = "Get Application")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var application = await _applicationManager.GetApplication(ApplicationId());         

            return Ok(GetApplicationDtoFromEntity(application));
        }


        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="applicationId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationDto), StatusCodes.Status200OK)]
        [Route("api/Application/Resume", Name = "Resume Application ID Application")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetResume(string email, string phone, Guid applicationId)
        {
            try
            {
                var application = await _applicationManager.GetApplication(applicationId);
                if(application.LeadInfo.Email != email && application.LeadInfo.Phone != phone)
                {
                    throw new RepoLayerException(ErrorCode.Forbidden, "Invalid Email or Phone");
                }
                return Ok(GetApplicationDtoFromEntity(application));
            }
            catch (Exception ex)
            {
                throw new RepoLayerException(ErrorCode.Forbidden, "Invalid Email or Phone");
            }
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [Route("api/Application/Resume/Send", Name = "Resume Application")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ResumeActivity(string email, string phone)
        {
            try
            {
                var challengeCode = await _applicationManager.GetApplicationByEmailPhone(email, phone);
                return Ok(challengeCode);
            }
            catch(Exception ex)
            {
                throw new RepoLayerException(ErrorCode.Forbidden, "Invalid Email or Phone");
            }                 
        }


        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="applicationId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationDto), StatusCodes.Status200OK)]
        [Route("api/Application/Resume/ChallengeCode", Name = "Resume Challenge Application")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ResumeActivityChallenge(string email, string phone, string challengeCode)
        {
            try
            {
                if(challengeCode != null)
                {
                    var application = await _applicationManager.GetApplicationByChallengeCode(email, phone, challengeCode);
                    return Ok(GetApplicationDtoFromEntity(application));
                }
                else
                {
                    throw new Exception("no challenge Code provided");
                }
               
            }
            catch (Exception ex)
            {
                throw new RepoLayerException(ErrorCode.Forbidden, "Invalid Email or Phone or Challenge Code");
            }
        }

        /// <summary>
        /// Create Application
        /// </summary>
        /// <param name="applicationDto"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationDto), StatusCodes.Status200OK)]
        [Route("api/Application", Name = "Create Initial Application")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create(ApplicationDto applicationDto)
        {
            var application = GetApplicationEntity(applicationDto);
            //application.ApplicationId = ApplicationId();
            Application applicationWithIds = await _applicationManager.CreateApplication(application);
            return Ok(GetApplicationDtoFromEntity(applicationWithIds));
        }


        /// <summary>
        /// Update Application
        /// </summary>
        /// <param name="applicationDto"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationDto), StatusCodes.Status200OK)]
        [Route("api/Application", Name = "Update Application")]
        [HttpPatch]
        [AllowAnonymous]
        public async Task<IActionResult> Update(ApplicationDto applicationDto)
        {
            _logger.LogWarning("Got to here with application Id " + applicationDto.ApplicationId);

            var application = GetApplicationEntity(applicationDto);
            Application applicationWithIds = await _applicationManager.UpdateApplication(application);
            return Ok(GetApplicationDtoFromEntity(applicationWithIds));
        }

        /// <summary>
        /// Delete Application
        /// </summary>
        /// <param name="applicationId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application", Name = "Delete Application")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid applicationId)
        {
            return Ok();
        }

        /// <summary>
        /// Get Application Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationInfoDto), StatusCodes.Status200OK)]
        [Route("api/Application/ApplicationInfo/{applicationInfoId}", Name = "Get Application Info")]
        [HttpGet]
        public async Task<IActionResult> GetApplicationInfo(Guid applicationInfoId)
        {
            var applicationInfo = await _applicationInfoManager.GetApplicationInfo(applicationInfoId, ApplicationId());
            var applicationInfoDto = _mapper.Map<ApplicationInfoDto>(applicationInfo);
            if (applicationInfoDto.SeparateOwner)
            {
                var beneficiaries = await _familyOrBeneficiaryManager.GetFamilyOrBeneficiaryForSeparateOwner(ApplicationId());
                applicationInfoDto.SeparatePolicyOwner = _mapper.Map<SeparatePolicyOwner>(beneficiaries);
            }

            return Ok(applicationInfoDto);
        }

        /// <summary>
        /// Create Application Info
        /// </summary>
        /// <param name="application"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [Route("api/Application/ApplicationInfo", Name = "Create Initial Application Info")]
        [HttpPost]
        public async Task<IActionResult> CreateApplicationInfo(ApplicationInfoDto applicationInfoDto)
        {
            var applicationInfo = _mapper.Map<ApplicationInfo>(applicationInfoDto);
            var applicationInfoId = await _applicationInfoManager.CreateApplicationInfo(applicationInfo, ApplicationId());
            if (applicationInfoDto.SeparateOwner && applicationInfoDto.SeparatePolicyOwner != null)
            {
                var familyOrBeneficiary = _mapper.Map<FamilyOrBeneficiary>(applicationInfoDto.SeparatePolicyOwner);
                await _familyOrBeneficiaryManager.CreateOrUpdateFamilyOrBeneficiary(familyOrBeneficiary, ApplicationId());
            }

            return Ok(applicationInfoId);
        }

        /// <summary>
        /// Update Application Info
        /// </summary>
        /// <param name="applicationInfoDto"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/ApplicationInfo", Name = "Update Application Info")]
        [HttpPatch]
        public async Task<IActionResult> UpdateApplicationInfo(ApplicationInfoDto applicationInfoDto)
        {
            var applicationInfo = _mapper.Map<ApplicationInfo>(applicationInfoDto);
            await _applicationInfoManager.UpdateApplicationInfo(applicationInfo, ApplicationId());
            if (applicationInfoDto.SeparateOwner && applicationInfoDto.SeparatePolicyOwner != null)
            {
                var familyOrBeneficiary = _mapper.Map<FamilyOrBeneficiary>(applicationInfoDto.SeparatePolicyOwner);
                await _familyOrBeneficiaryManager.CreateOrUpdateFamilyOrBeneficiary(familyOrBeneficiary, ApplicationId());
            }

            return Ok();
      
        }

        /// <summary>
        /// Delete Application Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/ApplicationInfo", Name = "Delete Application Info")]
        [HttpDelete]
        public async Task<IActionResult> DeleteApplicationInfo(Guid applicationInfoId)
        {
            return Ok();
        }

        /// <summary>
        /// Get Application Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(SeparatePolicyOwner), StatusCodes.Status200OK)]
        [Route("api/Application/ApplicationInfo/{applicationInfoId}/SeparateOwner", Name = "Get Separate Owner Info")]
        [HttpGet]
        public async Task<IActionResult> GetSeparateOwnerInfo(Guid applicationInfoId)
        {
            var applicationInfo = await _applicationInfoManager.GetApplicationInfo(applicationInfoId, ApplicationId());
            var applicationInfoDto = _mapper.Map<ApplicationInfoDto>(applicationInfo);
            if (applicationInfoDto.SeparateOwner)
            {
                var beneficiaries = await _familyOrBeneficiaryManager.GetFamilyOrBeneficiaryForSeparateOwner(ApplicationId());
                applicationInfoDto.SeparatePolicyOwner = _mapper.Map<SeparatePolicyOwner>(beneficiaries);
            }

            return Ok(applicationInfoDto.SeparateOwner);
        }

        /// <summary>
        /// Create Separate Owner Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <param name="separatePolicyOwner"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [Route("api/Application/ApplicationInfo/{applicationInfoId}/SeparateOwner", Name = "Create Initial Separate Owner Info")]
        [HttpPost]
        public async Task<IActionResult> CreateSeparateOwnerInfo(Guid applicationInfoId, SeparatePolicyOwner separatePolicyOwner)
        {
            var familyOrBeneficiary = _mapper.Map<FamilyOrBeneficiary>(separatePolicyOwner);
            await _familyOrBeneficiaryManager.CreateOrUpdateFamilyOrBeneficiary(familyOrBeneficiary, ApplicationId());
            var beneficiaries = await _familyOrBeneficiaryManager.GetFamilyOrBeneficiaryForSeparateOwner(ApplicationId());
          
            return Ok(beneficiaries.FamilyOrBeneficiaryId);
        }

        /// <summary>
        /// Update Separate Owner Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <param name="separatePolicyOwner"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/ApplicationInfo/{applicationInfoId}/SeparateOwner", Name = "Update Separate Owner Info")]
        [HttpPatch]
        public async Task<IActionResult> UpdateSeparateOwnerInfo(Guid applicationInfoId, SeparatePolicyOwner separatePolicyOwner)
        {
            var familyOrBeneficiary = _mapper.Map<FamilyOrBeneficiary>(separatePolicyOwner);
            await _familyOrBeneficiaryManager.CreateOrUpdateFamilyOrBeneficiary(familyOrBeneficiary, ApplicationId());

            return Ok();
        }

        /// <summary>
        /// Delete Separate Owner Info
        /// </summary>
        /// <param name="applicationInfoId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/ApplicationInfo/{applicationInfoId}/SeparateOwner", Name = "Delete Separate Owner Info")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSeparateOwnerInfo(Guid applicationInfoId)
        {
            return Ok();
        }


        private ApplicationDto GetApplicationDtoFromEntity(Application applicationWithIds)
        {
            var applicationDtoFromDb = _mapper.Map<ApplicationDto>(applicationWithIds);

            var SeparePolicyOwner = applicationDtoFromDb.Beneficiaries.Where(x => Convert.ToInt32(x.PrimaryRelationship) >= 21 && Convert.ToInt32(x.PrimaryRelationship) <= 25).FirstOrDefault();

            if (SeparePolicyOwner != null)
            {
                applicationDtoFromDb.ApplicationInfo.SeparatePolicyOwner = _mapper.Map<SeparatePolicyOwner>(SeparePolicyOwner);
                applicationDtoFromDb.ApplicationInfo.SeparatePolicyOwner.PolicyOwnerRelationship = SeparePolicyOwner.PrimaryRelationship;
                applicationDtoFromDb.Beneficiaries.Remove(SeparePolicyOwner);
            }
           
            if (applicationWithIds.HealthQuestions.Any())
            {
                applicationDtoFromDb.HealthQuestions = new List<ApplicationHealthQuestionDto>();

                 var applicationHealthQuestionsFromDb = applicationWithIds.HealthQuestions.Where(x => x.LeadHealthQuestion == LeadHealthQuestions.NotAvailable);
                applicationDtoFromDb.HealthQuestions.AddRange(_mapper.Map<List<ApplicationHealthQuestionDto>>(applicationHealthQuestionsFromDb));

            }

            var leadHealthQuestionsFromDB = applicationWithIds.HealthQuestions.Where(x => x.ApplicationQuestion == ApplicationHealthQuestions.NullValue);

            if (leadHealthQuestionsFromDB != null)
            {
                applicationDtoFromDb.LeadInfo.HealthQuestions = _mapper.Map<List<LeadHealthQuestionDto>>(leadHealthQuestionsFromDB);
                
            }


            applicationDtoFromDb.ApplicationInfo.ValidApplyStates = _config["Configuration:ValidStates"].Split(",").ToList();
            return applicationDtoFromDb;
        }



        private Application GetApplicationEntity(ApplicationDto applicationDto)
        {          
            var application = _mapper.Map<Application>(applicationDto);
            application.HealthQuestions = new List<HealthQuestion>();

            foreach(var leadHealthQuestions in applicationDto.LeadInfo.HealthQuestions)
            {
                var leadHealthQuestion = _mapper.Map<HealthQuestion>(leadHealthQuestions);
                leadHealthQuestion.LeadHealthQuestion = leadHealthQuestions.LeadHealthQuestion;
                leadHealthQuestion.ApplicationQuestion = ApplicationHealthQuestions.NullValue;
                application.HealthQuestions.Add(leadHealthQuestion);
            }
            //application.HealthQuestions.AddRange(_mapper.Map<List<HealthQuestion>>(applicationDto.LeadInfo.HealthQuestions));
            
            //application.HealthQuestions.AddRange(_mapper.Map<List<HealthQuestion>>(applicationDto.HealthQuestions));
            foreach (var healthQuestions in applicationDto.HealthQuestions)
            {
                var healthQuestion = _mapper.Map<HealthQuestion>(healthQuestions);
                healthQuestion.LeadHealthQuestion = LeadHealthQuestions.NotAvailable;
                healthQuestion.ApplicationQuestion = healthQuestions.ApplicationQuestion;
                application.HealthQuestions.Add(healthQuestion);
            }
            //  application.ApplicationId = ApplicationId();

            if (application.ApplicationInfo != null && applicationDto.ApplicationInfo.SeparateOwner && applicationDto.ApplicationInfo.SeparatePolicyOwner != null)
            {
                var familyOrBeneficiary = _mapper.Map<FamilyOrBeneficiary>(applicationDto.ApplicationInfo.SeparatePolicyOwner);
                familyOrBeneficiary.PrimaryRelationship = applicationDto.ApplicationInfo.SeparatePolicyOwner.PolicyOwnerRelationship;

                application.Beneficiaries.Add(familyOrBeneficiary);
            }

            return application;
        }

    }
}
