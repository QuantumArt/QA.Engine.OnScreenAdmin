using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QA.DotNetCore.Caching;
using QA.DotNetCore.Caching.Interfaces;
using QA.DotNetCore.Engine.CacheTags;
using QA.DotNetCore.Engine.CacheTags.Configuration;
using QA.DotNetCore.Engine.Persistent.Dapper;
using QA.DotNetCore.Engine.Persistent.Interfaces;
using QA.DotNetCore.Engine.QpData.Persistent.Dapper;
using QA.DotNetCore.Engine.QpData.Replacements;
using QA.DotNetCore.Engine.QpData.Settings;
using QA.DotNetCore.OnScreenAdmin.Web.Auth;
using Quantumart.QPublishing.Authentication;
using Quantumart.QPublishing.Database;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using QA.DotNetCore.Caching.Configuration;
using QA.DotNetCore.Engine.Persistent.Configuration;
using QP.ConfigurationService.Models;

namespace QA.DotNetCore.OnScreenAdmin.Web
{
    public class Startup
    {
        const string SWAGGER_VERSION = "v1";
        const string SWAGGER_TITLE = "OnScreen Web Api";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddSwaggerGen(o =>
            {
                o.SwaggerDoc(SWAGGER_VERSION, new OpenApiInfo
                {
                    Title = SWAGGER_TITLE,
                    Version = SWAGGER_VERSION
                });
                var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);
                o.IncludeXmlComments(xmlPath);
            });
            services.TryAddSiteStructureRepositories();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped(sp =>
            {
                var uow = sp.GetService<IUnitOfWork>();
                return new DBConnector(uow.Connection);
            });
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<IUnitOfWork, UnitOfWork>(sp =>
            {
                var httpContextAccessor = sp.GetService<IHttpContextAccessor>();
                if (!httpContextAccessor.HttpContext.Request.Headers.TryGetValue("Customer-Code", out var customerCode))
                {
                    throw new Exception("Customer-Code header must be provided.");
                }

                var config = Configuration.GetSection("ConfigurationService").Get<ConfigurationServiceConfig>();
                if (!String.IsNullOrEmpty(config.Url) && !String.IsNullOrEmpty(config.Token))
                {
                    DBConnector.ConfigServiceUrl = config.Url;
                    DBConnector.ConfigServiceToken = config.Token;
                }
                CustomerConfiguration dbConfig = DBConnector.GetCustomerConfiguration(customerCode.ToString()).Result;
                return new UnitOfWork(dbConfig.ConnectionString, dbConfig.DbType.ToString());
            });
            services.AddScoped<IAbTestRepository, AbTestRepository>();

            var qpUrlResolverCacheSettings = new QpSiteStructureCacheSettings
                {QpSchemeCachePeriod = new TimeSpan(0, 1, 0)};
            services.AddSingleton(typeof(QpSiteStructureCacheSettings), qpUrlResolverCacheSettings);
            services.AddScoped<IQpUrlResolver, QpUrlResolver>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = QpAuthDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = QpAuthDefaults.AuthenticationScheme;
            }).AddQpAuth(authOptions =>
            {
                authOptions.Settings = Configuration.GetSection("QpAuthSettings").Get<QpAuthSettings>();
            });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicy(
                    new List<IAuthorizationRequirement>
                    {
                        new QpUserRequirement()
                    },
                    new[] {QpAuthDefaults.AuthenticationScheme});
            });

            services.AddCacheTagServices()
                .WithInvalidationByMiddleware(@"^(?!\/api\/).+$") //инвалидировать только если запрос начинается с /api/
                .WithCacheTrackers(trackers => { trackers.Register<QpContentCacheTracker>(); });

            services.AddHealthChecks();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                    );
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCacheTagsInvalidation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseHealthChecks("/ready");

            app.UseSwagger();
            app.UseSwaggerUI(o =>
            {
                o.SwaggerEndpoint("/swagger/v1/swagger.json", $"{SWAGGER_TITLE} {SWAGGER_VERSION}");
            });
        }
    }
}
