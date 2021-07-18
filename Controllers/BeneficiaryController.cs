using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ForSureLife.biz.Interfaces;
using ForSureLife.Models.DTO;
using ForSureLife.repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Authorize]
    [Route("")]
    [ApiController]
    public class BeneficiaryController : BaseController
    {
        private readonly ILogger _logger;
        public IMapper _mapper { get; set; }
        public IFamilyOrBeneficiaryManager _familyManager { get; set; }

        public BeneficiaryController(IFamilyOrBeneficiaryManager familyManager, IMapper mapper, ILoggerFactory logFactory)
        {
            _familyManager = familyManager;
            _logger = logFactory.CreateLogger<LeadController>();
            _mapper = mapper;
        }
        /// <summary>
        /// Get All Beneficiaries
        /// </summary>
        /// <param name="BeneficiariesId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(BeneficiariesDto), StatusCodes.Status200OK)]
        [Route("api/Application/Beneficiaries", Name = "Get Beneficiaries  Info")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var beneficiaries = _familyManager.GetFamilyOrBeneficiaries(ApplicationId());
            var beneficiariesDto = _mapper.Map<List<BeneficiariesDto>>(beneficiaries);
            return Ok(beneficiariesDto);
        }



        /// <summary>
        /// Create Beneficiaries
        /// </summary>
        /// <param name="beneficiariesDto"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [Route("pi/Application/Beneficiaries", Name = "Create Initial Beneficiaries Info")]
        [HttpPost]
        public async Task<IActionResult> Create(List<BeneficiariesDto> beneficiariesDto)
        {
            var beneficiaries = _mapper.Map<List<FamilyOrBeneficiary>>(beneficiariesDto);
            var beneficiary = _familyManager.CreateOrUpdateFamilyOrBeneficiary(beneficiaries, ApplicationId());
            var beneficiariesDtoDb = _mapper.Map<List<BeneficiariesDto>>(beneficiary);
            return Ok(beneficiariesDtoDb);
        }

        /// <summary>
        /// Update Beneficiaries
        /// </summary>
        /// <param name="beneficiaries"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("pi/Application/Beneficiaries", Name = "Update Beneficiaries Info")]
        [HttpPatch]
        public async Task<IActionResult> Update(List<BeneficiariesDto> beneficiariesDto)
        {
            var beneficiaries = _mapper.Map<List<FamilyOrBeneficiary>>(beneficiariesDto);
            var beneficiary = _familyManager.CreateOrUpdateFamilyOrBeneficiary(beneficiaries, ApplicationId());
            var beneficiariesDtoDb = _mapper.Map<List<BeneficiariesDto>>(beneficiary);
            return Ok();
        }



        /// <summary>
        /// Get All Beneficiaries
        /// </summary>
        /// <param name="BeneficiariesId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(BeneficiariesDto), StatusCodes.Status200OK)]
        [Route("api/Application/Beneficiaries/Benficiary/{beneficiariesId}", Name = "Get Beneficiary Info")]
        [HttpGet]
        public async Task<IActionResult> GetSingle(Guid beneficiariesId)
        {
            var beneficiaries = _familyManager.GetFamilyOrBeneficiaries(beneficiariesId, ApplicationId());
            var beneficiariesDto = _mapper.Map<BeneficiariesDto>(beneficiaries);
            return Ok(beneficiariesDto);
        }

        /// <summary>
        /// Create Beneficiary
        /// </summary>
        /// <param name="beneficiary"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [Route("pi/Application/Beneficiaries/Beneficiary", Name = "Create Initial Beneficiary Info")]
        [HttpPost]
        public async Task<IActionResult> CreateBeneficiary(BeneficiaryDto beneficiariesDto)
        {
            var beneficiaries = _mapper.Map<FamilyOrBeneficiary>(beneficiariesDto);
            var beneficiary = _familyManager.CreateOrUpdateFamilyOrBeneficiary(beneficiaries, ApplicationId());
            var beneficiariesDtoDb = _mapper.Map<List<BeneficiariesDto>>(beneficiary);

            return Ok(beneficiariesDtoDb);
        }

        /// <summary>
        /// Update Beneficiary
        /// </summary>
        /// <param name="beneficiary"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("pi/Application/Beneficiaries/Beneficiary", Name = "Update Beneficiary Info")]
        [HttpPatch]
        public async Task<IActionResult> UpdateBeneficiary(BeneficiaryDto beneficiariesDto)
        {
            var beneficiaries = _mapper.Map<FamilyOrBeneficiary>(beneficiariesDto);
            var beneficiary = _familyManager.CreateOrUpdateFamilyOrBeneficiary(beneficiaries, ApplicationId());
            var beneficiariesDtoDb = _mapper.Map<List<BeneficiariesDto>>(beneficiary);
            return Ok(beneficiariesDtoDb);
        }

        /// <summary>
        /// Delete Beneficiary
        /// </summary>
        /// <param name="beneficiaryId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("pi/Application/Beneficiaries/Beneficiary/{beneficiariesId}", Name = "Delete Beneficiary Info")]
        [HttpDelete]
        public async Task<IActionResult> DeleteBeneficiary(Guid beneficiariesDto)
        {
            var beneficiary = _familyManager.DeleteFamilyOrBeneficiary(beneficiariesDto, ApplicationId());
            return Ok();
        }


    }
}
