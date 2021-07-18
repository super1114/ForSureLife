using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/enroll")]
    [ApiController]
    public class EnrollController : BaseController
    {
    }
}
