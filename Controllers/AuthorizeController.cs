using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ForSureLife.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace ForSureLife.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    [ApiController]
    public class AuthorizeController : BaseController
    {

        private readonly ILogger _logger;
        private readonly IConfiguration _config;

        public AuthorizeController(IConfiguration config, ILoggerFactory logFactory)
        {
            _logger = logFactory.CreateLogger<AuthorizeController>();
            _config = config;
        }

        /// <summary>
        /// Create Token
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken(LoginModelDto login)
        {
            _logger.LogInformation("Login Provider Called");
            var applicationId = login.applicationId;
            if (login == null && login.Username== string.Empty && login.Password == string.Empty)
            {
                _logger.LogError("No Login information provided");
                throw new UnauthorizedAccessException();

            }
            string tokenString = string.Empty;


            _logger.LogInformation("Checking username and password");
            bool validUser = Authenticate(login);
            if (validUser)
            {
                _logger.LogInformation("Building JWT Token");
                tokenString = BuildJWTToken(applicationId.ToString());
            }
            else
            {
                _logger.LogError("Username and Password were incorrect", LogLevel.Error);
                throw new UnauthorizedAccessException();
            }
            _logger.LogInformation("Login Success");
            return Ok(new { Token = tokenString,
                            ApplicationId = applicationId
            });
        }
        /// <summary>
        /// Test Get
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation($"Success in testing authentication {0}", ApplicationId());
            return Ok("SUCCESS!!! applicationId = " + ApplicationId());
        }

         private bool Authenticate(LoginModelDto login)
        {
            bool validUser = false;
            if (login.Username == _config["AuthLogin:UserName"] & login.Password == _config["AuthLogin:Password"])
           {
                validUser = true;
            }

            return validUser;
        }



        private string BuildJWTToken(string applicationId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtToken:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var issuer = _config["JwtToken:Issuer"];
            var audience = _config["JwtToken:Audience"];
            var jwtValidity = DateTime.Now.AddMinutes(Convert.ToDouble(_config["JwtToken:TokenExpiry"]));
            
            var claims = new List<Claim>() {
                new Claim("applicationId", applicationId)
                    };


            var token = new JwtSecurityToken(issuer,
              audience,
              claims : claims,
              expires: jwtValidity,
              signingCredentials: creds);
         
        
            return new JwtSecurityTokenHandler().WriteToken(token);
        }




    }
}
