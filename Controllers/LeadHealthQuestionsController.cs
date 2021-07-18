using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ForSureLife.biz.Interfaces;
using ForSureLife.Models.DTO;
using ForSureLife.Models.Enums;
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
    public class LeadHealthQuestionsController : BaseController
    {

        public IHealthQuestionManager _healthQuestionsManager { get; set; }

        private readonly ILogger _logger;
        public IMapper _mapper { get; set; }
        public LeadHealthQuestionsController(IMapper mapper, ILoggerFactory logFactory)
        {
            _logger = logFactory.CreateLogger<LeadController>();
            _mapper = mapper;
        }
        /// <summary>
        /// Get Health Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(LeadHealthQuestionsDto), StatusCodes.Status200OK)]
        [Route("api/LeadHealthQuestions", Name = "Get Lead Health Questions by Id")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid healthQuestionId)
        {
            var healthQuestions = await _healthQuestionsManager.GetHealthQuestions(ApplicationId(), true);
            var leadHealthQuestionsDto = _mapper.Map<List<LeadHealthQuestionDto>>(healthQuestions);

            return Ok(leadHealthQuestionsDto);
        }

        /// <summary>
        /// Create Initial HealthQuestions, Must call before Updating individual Questions
        /// </summary>
        /// <param name="healthQuestionsDto"></param>
        /// <returns></returns>
        [Route("api/LeadHealthQuestions", Name = "Create Lead Health Questions")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [HttpPost]
        public async Task<IActionResult> Create(List<LeadHealthQuestionsDto> healthQuestionsDto)
        {
            var healthQuestions = _mapper.Map<List<HealthQuestion>>(healthQuestionsDto);
            var healthQuestionsDb =  await _healthQuestionsManager.CreateHealthQuestions(healthQuestions, ApplicationId());
            var healthQuestionsDbDto = _mapper.Map<List<LeadHealthQuestionsDto>>(healthQuestionsDb);
            return Ok(healthQuestionsDbDto);
        }


        /// <summary>
        /// Delete Lead Health Questions, Testing Only
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [Route("api/LeadHealthQuestions/{healthQuestionId}", Name = "Delete All Health Questions (testing Only) ")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid healthQuestionId)
        {
            return Ok();
        }

        /// <summary>
        /// Get Individual Lead Health Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(LeadHealthQuestionDto), StatusCodes.Status200OK)]
        [Route("api/LeadHealthQuestions/Question/{leadHealthQuestionId}", Name = "Get Specific Lead Health Question by Question Enum ")]
        [HttpGet]
        public async Task<IActionResult> GetLeadHealthQuestion(int leadHealthQuestionId)
        {
      
            var healthQuestionsDb = await _healthQuestionsManager.GetHealthQuestion(leadHealthQuestionId, ApplicationId(), true);
            var healthQuestionsDbDto = _mapper.Map<LeadHealthQuestionsDto>(healthQuestionsDb);
            return Ok(healthQuestionsDbDto);
        }

        /// <summary>
        /// Create Individual Question
        /// </summary>
        /// <param name="healthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Route("api/LeadHealthQuestions/Question/", Name = "Create Question")]
        [HttpPost]
        public async Task<IActionResult> CreateLeadHealthQuestion(LeadHealthQuestionDto healthQuestion)
        {
            var healthQuestions = _mapper.Map<HealthQuestion>(healthQuestion);
            var healthQuestionsId = await _healthQuestionsManager.CreateHealthQuestion(healthQuestions, ApplicationId());

            return Ok(healthQuestionsId);
        }

        /// <summary>
        /// Update Individual Question
        /// </summary>
        /// <param name="leadHealthQuestionId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/LeadHealthQuestions/Question", Name = "Update Question")]
        [HttpPatch]
        public async Task<IActionResult> UpdateLeadHealthQuestion(LeadHealthQuestionDto healthQuestion)
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
        [Route("api/LeadHealthQuestions/Question/{healthQuestionId}", Name = "Delete Health Question")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLeadHealthQuestion(LeadHealthQuestions healthQuestionId)
        {
            return Ok();
        }

    }
}
