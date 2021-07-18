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
    [Route("api/lead")]
    [ApiController]
    public class LeadController : BaseController
    {
        private readonly ILogger _logger;
        public ILeadInfoManager _leadInfoManager { get; set; }
        public IMapper _mapper { get; set; }
        public LeadController(ILeadInfoManager leadInfoManager, IMapper mapper, ILoggerFactory logFactory)
        {
            _logger = logFactory.CreateLogger<LeadController>();
            _leadInfoManager = leadInfoManager;
            _mapper = mapper;
        }
        /// <summary>
        /// Create Lead
        /// </summary>
        /// <param name="leadInfo"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
       // [Route("api/lead", Name = "Lead Info Creation")]
        [HttpPost]
        public async Task<IActionResult> Post(LeadDTO leadInfo)
        {
                _logger.LogInformation("Create Lead Post Created ApplicationId:{0}", ApplicationId());
                var application = new Application();
                application.ApplicationId = ApplicationId();
                application.LeadInfo = _mapper.Map<Lead>(leadInfo);

            _logger.LogInformation("Create Lead ApplicationId:{0}", ApplicationId());
            var leadId = await _leadInfoManager.CreateLead(application);
            //Create Application ID and return it
            return Ok(leadId);
        }


        /// <summary>
        /// Submit Sale of Lead
        /// </summary>
        /// <param name="leadInfo"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [HttpPost]
        [Route("LeadSale", Name = "LeadSale")]
        [AllowAnonymous]
        public async Task<IActionResult> IntegrityLeadPost(LeadSaleDto leads)
        {

            _logger.LogInformation("Sale of the Lead Post :{0}", leads.LeadId);

            if(leads.ApiKey != "89B02FD4-371C-45E9-99DC-44DE9B702C3F")
            {
                throw new Exception("Must provide correct API Key");
            }

            var LeadSale = new ForSureLife.repo.Models.Quote.LeadSale();
            
            LeadSale.LeadId = leads.LeadId;
            LeadSale.CreatedDate = DateTime.Now;
            LeadSale.UpdatedDate = DateTime.Now;
            LeadSale.Invoiced = false;

            await _leadInfoManager.SaleOfLead(LeadSale);
            //Create Application ID and return it
            return Ok();
        }

        /// <summary>
        /// Submit Sale of Lead
        /// </summary>
        /// <param name="leadInfo"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [HttpPost]
        [Route("LeadSales", Name = "BulkLeadSale")]
        [AllowAnonymous]
        public async Task<IActionResult> BulkIntegrityLeadPost(BulkLeadSaleDto leads)
        {

            if (leads.ApiKey != "89B02FD4-371C-45E9-99DC-44DE9B702C3F")
            {
                throw new Exception("Must provide correct API Key");
            }

            var leadSales = new List<ForSureLife.repo.Models.Quote.LeadSale>();
            foreach(var leadSale in leads.LeadId)
            {
                var LeadSale = new ForSureLife.repo.Models.Quote.LeadSale();
                LeadSale.LeadId = leadSale;
                LeadSale.CreatedDate = DateTime.Now;
                LeadSale.UpdatedDate = DateTime.Now;
                LeadSale.Invoiced = false;


                leadSales.Add(LeadSale);
            }


            await _leadInfoManager.SaleOfLead(leadSales);
            //Create Application ID and return it
            return Ok();
        }

        /// <summary>
        /// Update Lead
        /// </summary>
        /// <param name="leadInfo"></param>
        /// <returns></returns>
        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Patch(LeadDTO leadInfo)
        {
            _logger.LogInformation("Update Lead ApplicationId:{0} LeadId:{1}", ApplicationId(), leadInfo.LeadId);
            var application = new Application();
            application.ApplicationId = ApplicationId();
            application.LeadInfo = _mapper.Map<Lead>(leadInfo);
            _logger.LogInformation("Updating Lead ApplicationId:{0} LeadId:{1}", ApplicationId(), leadInfo.LeadId);
            await _leadInfoManager.UpdateLead(application);
            return Ok();

        }
        /// <summary>
        /// Get Lead by Id
        /// </summary>
        /// <param name="leadId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(LeadDTO), StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<IActionResult> Get(Guid leadId)
        {
             _logger.LogInformation("Getting Lead ApplicationId:{0} LeadId:{1}", ApplicationId(), leadId);
            var Lead = _leadInfoManager.GetLead(leadId, ApplicationId());
            var leadDto = _mapper.Map<LeadDTO>(Lead.Result);
            return Ok(leadDto);

        }
        /// <summary>
        /// Delete Lead, Testing Only
        /// </summary>
        /// <param name="leadId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid leadId)
        {
            _logger.LogInformation("Delete Lead ApplicationId:{0} LeadId:{1}", ApplicationId(), leadId);
            _leadInfoManager.DeleteLead(leadId, ApplicationId());
            return Ok();
        }

    }
}
