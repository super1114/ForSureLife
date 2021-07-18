using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ForSureLife.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Authorize]
    [Route("")]
    [ApiController]
    public class PaymentController : BaseController
    {

        public PaymentController()
        {

        }
        /// <summary>
        /// Get Payment
        /// </summary>
        /// <param name="paymentId"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(PaymentInfoDto), StatusCodes.Status200OK)]
        [Route("api/Payment", Name = "Get Payment Info")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid paymentId)
        {
            return Ok(new PaymentInfoDto());
        }

        /// <summary>
        /// Create Payment
        /// </summary>
        /// <param name="paymentInfo"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [Route("api/Payment", Name = "Create Initial Payment Info")]
        [HttpPost]
        public async Task<IActionResult> Create(PaymentInfoDto paymentInfo)
        {
            return Ok(new Guid());
        }

        /// <summary>
        /// Update Payment
        /// </summary>
        /// <param name="paymentInfo"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Payment", Name = "Update Payment Info")]
        [HttpPatch]
        public async Task<IActionResult> Update(PaymentInfoDto paymentInfo)
        {

            return Ok();
        }

        /// <summary>
        /// Delete Payment 
        /// </summary>
        /// <param name="paymentId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("api/Payment", Name = "Delete Payment Info")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid paymentId)
        {
            return Ok();
        }
    }
}
