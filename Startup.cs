using ForSureLife.biz.Interfaces;
using ForSureLife.biz.Services;
using ForSureLife.ErrorHandler;
using ForSureLife.repo;
using ForSureLife.repo._3rdPartyIntegrations;
using ForSureLife.repo.Carrier_Access;
using ForSureLife.repo.Interfaces;
using ForSureLife.repo.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace ForSureLife
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);

            services.AddAutoMapper(typeof(Startup));

            services.AddScoped<IApplicationInfoManager, ApplicationInfoManager>();
            services.AddScoped<IApplicationManager, ApplicationManager>();
            services.AddScoped<IFamilyMemberManager, FamilyMemberManager>();
            services.AddScoped<IFamilyOrBeneficiaryManager, FamilyOrBeneficiaryManager>();
            services.AddScoped<IHealthQuestionManager, HealthQuestionManager>();
            services.AddScoped<ILeadInfoManager, LeadInfoManager>();
            services.AddScoped<IPaymentInfoManager, PaymentInfoManager>();
            services.AddScoped<IAmAmQuoteRateManager, AmAmQuoteRateManager>();
            services.AddScoped<IQuoteManager, QuoteManager>();
            services.AddScoped<IForSureLifeDocumentManager, ForSureLifeDocumentManager>();
            services.AddScoped<IBankInfoManager, BankInfoManager>();

            services.AddScoped<IAmAmApplicationRepository, AmAmApplicationRepository>();
            services.AddScoped<IApplicationInfoRepository, ApplicationInfoRepository>();
            services.AddScoped<IApplicationRepository, ApplicationRepository>();
            services.AddScoped<IFamilyMemberRepository, FamilyMemberRepository>();
            services.AddScoped<IFamilyOrBeneficiaryRepository, FamilyOrBeneficiaryRepository>();
            services.AddScoped<IHealthQuestionsRepository, HealthQuestionsRepository>();
            services.AddScoped<ILeadRepository, LeadRepository>();
            services.AddScoped<IPaymentInfoRepository, PaymentInfoRepository>();
            services.AddScoped<IRateAmAmRepository, RateAmAmRepository>();
            services.AddScoped<IBankInfoRepository, BankInfoRepository>();
            services.AddScoped<IOmniSendAPI, OmniSendAPI>();
            services.AddScoped<IAmAmFTPClient, AmAmFTPClient>();
            services.AddScoped<IAmAmBlobClient, AmAmBlobClient>();
            services.AddScoped<IASDSendGrid, ASDSendGrid>();

            services.AddDbContext<ForSureLifeDBContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:Default"]), ServiceLifetime.Transient);
            services.AddDbContext<ChildForSureLifeDBContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:Default"]), ServiceLifetime.Transient);
            //using (var context = new ForSureLifeDBContext())
            //{
            //    context.Database.Migrate();
            //}

            services.AddControllersWithViews();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ForSureLife API",
                    Version = "v1",
                    Description = "API for the UI.",
                    Contact = new OpenApiContact
                    {
                        Name = "Craig Nelson",
                        Email = string.Empty
                    },
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                   {
                         {
                         new OpenApiSecurityScheme
                         {
                             Reference = new OpenApiReference
                             {
                                 Type = ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                             }
                         },
                     new string[] {}
                     }
                 });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["JwtToken:Issuer"],
                    ValidAudience = Configuration["JwtToken:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtToken:SecretKey"]))
                };
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddApplicationInsightsTelemetry(Configuration["APPINSIGHTS_CONNECTIONSTRING"]);


            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        builder =>
            //        {
            //            builder.WithOrigins("https://kalilife-seniordirect.azurewebsites.net/",
            //                                "https://www.AmericanSeniorDirect.com", "https://americanseniordirect.com").AllowAnyHeader().AllowAnyMethod();


            //        });
            //});

            services.AddLogging(options =>
            {
                options.AddConsole();
                options.SetMinimumLevel(LogLevel.Trace);

                // hook the Application Insights Provider
                options.AddFilter<ApplicationInsightsLoggerProvider>("", LogLevel.Warning);

                // pass the InstrumentationKey provided under the appsettings
                //  options.AddApplicationInsights(Configuration["APPINSIGHTS_CONNECTIONSTRING"]);

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env, ForSureLifeDBContext context)
        {
            try
            {
                context.Database.Migrate();
            }
            catch (System.Exception)
            { }
            if (env.IsDevelopment())
            {


            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseApplicationInsightsRequestTelemetry();
            app.UseDeveloperExceptionPage();

            SwaggerBuilderExtensions.UseSwagger(app);

            // Enable middleware to serve swagger-ui (HTML, JS,s CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ForSureLife API V1");
                c.OAuthClientId("swagger-ui");
                c.OAuthClientSecret("swagger-ui-secret");
                c.OAuthRealm("swagger-ui-realm");
                c.OAuthAppName("Swagger UI");
            });
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseExceptionHandler(new ExceptionHandlerOptions
            {
                ExceptionHandler = new GlobalExceptionHandler(env).Invoke
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start:local");
                }
            });


        }
    }
}
