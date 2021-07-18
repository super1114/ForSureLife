using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ForSureLife.Models.ErrorHandling;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForSureLife.Controllers
{

    public abstract class BaseController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public Guid ApplicationId()
        {
            try
            {
                return new Guid(this.User.Claims.Where(x => x.Type == "applicationId").FirstOrDefault().Value);
            }catch(Exception ex)
            {
                throw new RepoLayerException(ErrorCode.Forbidden, "No Authorization Token found");
            }
        }

    }
}
