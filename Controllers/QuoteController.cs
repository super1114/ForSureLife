using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using ForSureLife.biz.Interfaces;
using ForSureLife.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ForSureLife.repo.Models.Enroll;
using NSwag.Annotations;
using System.IO;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Authorize]

    [ApiController]
    public class QuoteController : BaseController
    {
        public IQuoteManager _quoteManager { get; set; }
        private readonly ILogger _logger;
        public IMapper _mapper { get; set; }
        public IAmAmQuoteRateManager _amAmManager { get; set; }
        public QuoteController(IQuoteManager quoteManager, IMapper mapper, ILoggerFactory logFactory, IAmAmQuoteRateManager amAmManager)
        {
            _mapper = mapper;
            _logger = logFactory.CreateLogger<QuoteController>();
            _quoteManager = quoteManager;
            _amAmManager = amAmManager;
        }
        /// <summary>
        /// Get Quote by Id
        /// </summary>
        /// <param name="quoteId"></param>
        /// <returns></returns>
        [Route("api/quote")]
        [ProducesResponseType(typeof(QuoteDto), StatusCodes.Status200OK)]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetQuote(Guid applicationId)
        {

            var quoteDto = await _amAmManager.GetQuoteData(applicationId);
            //Look up Quote 
            //return Quote
            return Ok(quoteDto);

        }


        /// <summary>
        /// Update Application Health Questions
        /// </summary>
        /// <param name="healthQuestions"></param>
        /// <returns></returns>
        [Route("api/Application/AmAmApplication", Name = "Get Am AM application")]
        [ProducesResponseType(typeof(AAFinalExpense), StatusCodes.Status200OK)]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAmAmApplication(Guid applicationId)
        {
            return Ok(await _amAmManager.GetApplication(applicationId));


        }

        /// <summary>
        /// Update Application Health Questions
        /// </summary>
        /// <param name="healthQuestions"></param>
        /// <returns></returns>
        [Route("api/Application/AmAmApplication", Name = "Update Am AM application")]
        [ProducesResponseType(typeof(AAFinalExpense), StatusCodes.Status200OK)]
        [HttpPatch]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateAmAmApplication(AAFinalExpense application)
        {
            // todo if you setting behid a application proxy (nginx   apache) you have to add 
            // code to your startup page to make sure you getting the client ipadress not the ip of the 
            // public facing application proxy
            //      application.ClientIPAddress=this.HttpContext.Connection.RemoteIpAddress.ToString();
            return Ok(await _amAmManager.UpdateApplication(application));


        }


        /// <summary>
        /// Update Application Health Questions
        /// </summary>
        /// <param name="healthQuestions"></param>
        /// <returns></returns>
        [Route("api/Application/AmAmApplication", Name = "Update Am AM application")]
        [ProducesResponseType(typeof(AAFinalExpense), StatusCodes.Status200OK)]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SubmitAmAmApplication(Guid applicationId)
        {
            await _amAmManager.SubmitApplication(applicationId);
            return Ok();
        }


        /// <summary>
        /// Update Application Health Questions
        /// </summary>
        /// <param name="healthQuestions"></param>
        /// <returns></returns>
        [Route("api/Application/AmAmApplication/pdf", Name = "Get Am AM application PDF")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<IActionResult> GetAmAmApplicationPDF()
        {
            var path = await _amAmManager.GetApplicationPDF(ApplicationId());
            var stream = new FileStream(path, FileMode.Open);
            return File(stream, "application/pdf", "SignedApplication-" + ApplicationId());


        }
    }



}
