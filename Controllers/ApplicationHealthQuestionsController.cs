using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ForSureLife.biz.Interfaces;
using ForSureLife.Models.DTO;
using ForSureLife.repo.Models.Enroll;
using ForSureLife.repo.Models.Quote;
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
    public class ApplicationHealthQuestionsController : BaseController
    {
        public IHealthQuestionManager _healthQuestionsManager { get; set; }

        private readonly ILogger _logger;
        public IMapper _mapper { get; set; }


        public ApplicationHealthQuestionsController(IHealthQuestionManager healthQuestionsManager, IMapper mapper, ILoggerFactory logFactory)
        {
            _healthQuestionsManager = healthQuestionsManager;
            _logger = logFactory.CreateLogger<LeadController>();
            _mapper = mapper;
        }


   


        /// <summary>
        /// Get Application Health Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationHealthQuestionsDto), StatusCodes.Status200OK)]
        [Route("api/Application/HealthQuestions", Name = "Get Application Health Question by Id")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var healthQuestions = await _healthQuestionsManager.GetHealthQuestions(ApplicationId(), false);
            var leadHealthQuestionsDto = _mapper.Map<List<ApplicationHealthQuestionsDto>>(healthQuestions);

            return Ok(leadHealthQuestionsDto);
        }




        /// <summary>
        /// Create Initial Application Health Questions, Must call before Updating individual Questions
        /// </summary>
        /// <param name="healthQuestionsDto"></param>
        /// <returns></returns>
        [Route("api/Application/HealthQuestions", Name = "Create Application Health Questions")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [HttpPost]
        public async Task<IActionResult> Create(ApplicationHealthQuestionsDto healthQuestionsDto)
        {
            var healthQuestions = _mapper.Map<List<HealthQuestion>>(healthQuestionsDto);
            var healthQuestionsDb = await _healthQuestionsManager.CreateHealthQuestions(healthQuestions, ApplicationId());
            var healthQuestionsDbDto = _mapper.Map<List<LeadHealthQuestionsDto>>(healthQuestionsDb);
            return Ok(healthQuestionsDbDto);
        }

        /// <summary>
        /// Update Application Health Questions
        /// </summary>
        /// <param name="healthQuestions"></param>
        /// <returns></returns>
        [Route("api/Application/HealthQuestions", Name = "Update Application Health Questions")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpPatch]
        public async Task<IActionResult> Update(ApplicationHealthQuestionsDto healthQuestion)
        {
            var healthQuestions = _mapper.Map<HealthQuestion>(healthQuestion);
            await _healthQuestionsManager.UpdateHealthQuestion(healthQuestions, ApplicationId());
            return Ok();
        }

        /// <summary>
        /// Delete Application Health Questions, Testing Only
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [Route("api/Application/HealthQuestions/Question/{healthQuestionId}", Name = "Delete All Application Health Questions (testing Only) ")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid healthQuestionId)
        {
            return Ok();
        }

        /// <summary>
        /// Get Application Health Questions
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(ApplicationHealthQuestionsDto), StatusCodes.Status200OK)]
        [Route("api/Application/HealthQuestions/Question/{ApplicationHealthQuestionId}", Name = "Get Application Health Questions by Id")]
        [HttpGet]
        public async Task<IActionResult> GetApplicationHealthQuestion(int ApplicationHealthQuestionId)
        {
            var healthQuestions = await _healthQuestionsManager.GetHealthQuestion(ApplicationHealthQuestionId, ApplicationId(), false);
            var leadHealthQuestionsDto = _mapper.Map<List<ApplicationHealthQuestionsDto>>(healthQuestions);

            return Ok(leadHealthQuestionsDto);
        }


        /// <summary>
        /// Create Individual Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Route("api/Application/HealthQuestions/Question/", Name = "Create Application Question")]
        [HttpPost]
        public async Task<IActionResult> CreateApplicationHealthQuestion(ApplicationHealthQuestionDto healthQuestion)
        {
            var healthQuestions = _mapper.Map<HealthQuestion>(healthQuestion);
            var healthQuestionsId = await _healthQuestionsManager.CreateHealthQuestion(healthQuestions, ApplicationId());

            return Ok(healthQuestionsId);
        }

        /// <summary>
        /// Update Individual Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/HealthQuestions/Question/", Name = "Update Application Question")]
        [HttpPatch]
        public async Task<IActionResult> UpdateApplicationHealthQuestion(ApplicationHealthQuestionDto healthQuestion)
        {
            var healthQuestions = _mapper.Map<HealthQuestion>(healthQuestion);
            await _healthQuestionsManager.UpdateHealthQuestion(healthQuestions, ApplicationId());
            return Ok();
        }

        /// <summary>
        /// Delete Individual Question, For Testing Only
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Application/HealthQuestions/Question/", Name = "Delete Application Health Question")]
        [HttpDelete]
        public async Task<IActionResult> DeleteApplicationHealthQuestion(ApplicationHealthQuestionDto healthQuestionId)
        {
            return Ok();
        }

    }
}
