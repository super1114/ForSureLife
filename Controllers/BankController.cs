using ForSureLife.biz.Interfaces;
using ForSureLife.repo.Models.Quote;
using ForSureLife.repo.Models.Rate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [AllowAnonymous]
    [Route("")]
    [ApiController]
    public class BankController : BaseController
    {
        private readonly IBankInfoManager _bankManager;
        public BankController(IBankInfoManager bankManager)
        {
            _bankManager = bankManager;
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="bankName"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<BankInfo>), StatusCodes.Status200OK)]
        [Route("api/Bank/Name/{bankName}", Name = "Get Bank Names")]
        [HttpGet]
        public async Task<IActionResult> GetBankName(string bankName)
        {
           return Ok(await _bankManager.GetBankName(bankName));
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="routingNumber"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(BankInfo), StatusCodes.Status200OK)]
        [Route("api/Bank/Routing/{routingNumber}", Name = "Get Routing Info")]
        [HttpGet]
        public async Task<IActionResult> GetRoutingInfo(string routingNumber)
        {
            return Ok(await _bankManager.GetRoutingInfo(routingNumber));
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(BirthPlaces), StatusCodes.Status200OK)]
        [Route("api/locations/{name}", Name = "Get Birth Locations")]
        [HttpGet]
        public async Task<IActionResult> GetBirthPlaces(string name)
        {
            return Ok(await _bankManager.GetDoctors(name));
        }

        /// <summary>
        /// Get Application
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(BirthPlaces), StatusCodes.Status200OK)]
        [Route("api/doctors/{name}", Name = "Get Doctors")]
        [HttpGet]
        public async Task<IActionResult> GetDoctors(string name)
        {
            return Ok(await _bankManager.GetDoctors(name));
        }

    }
}
