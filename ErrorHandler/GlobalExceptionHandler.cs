using ForSureLife.Models.ErrorHandling;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace ForSureLife.ErrorHandler
{
    public class GlobalExceptionHandler
    {
        private readonly IWebHostEnvironment _environment;
        private const string DefaultErrorMessage = "A server error occurred.";

        public GlobalExceptionHandler(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task Invoke(HttpContext httpContext)
        {
           

            var ex = httpContext.Features.Get<IExceptionHandlerFeature>().Error;


          

            if (ex == null)
            {
                return;
            }

            if (ex.InnerException != null && ex.InnerException.GetType().Name == "RepoLayerException")
            {
                ex = ex.InnerException;
            }

            if (ex.GetType().Name == "RepoLayerException")
            {
                RepoLayerException repoEx = (RepoLayerException) ex;
                ErrorCode errorCode = repoEx.DataError;
                httpContext.Response.StatusCode = (int) errorCode;
            }

            //if(ex.InnerException.GetType().Name == "RepoLayerException")
            //{
            //    RepoLayerException repoEx = (RepoLayerException)ex.InnerException;
            //    ErrorCode errorCode = repoEx.DataError;
            //    httpContext.Response.StatusCode = (int)errorCode;
            //}
         
            var error = new ApiError();

            if (_environment.IsDevelopment())
            {
               
                error.Message = ex.Message;
                error.Detail = ex.StackTrace;
                error.InnerException = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
            }
            else
            {
                error.Message = DefaultErrorMessage;
            }

            httpContext.Response.ContentType = "application/json";
    
            using( var newBody = new MemoryStream())
            {
                var newContent = new StreamReader(newBody).ReadToEnd();

                var errorJson = JsonSerializer.Serialize(error);

                newContent += errorJson;

                // Send our modified content to the response body.
                await httpContext.Response.WriteAsync(newContent);

            }  
        }


    }

    public class ApiError
    {
        public string Message { get; set; }
        public string Detail { get; set; }
        public string InnerException { get; set; }
    }
}
