using CMS_Cross_Music.Models;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CMS_Cross_Music
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });



            //Scaffold-DbContext "Server=tcp:cmsproject.database.windows.net,1433;Initial Catalog=CrossMusic;User ID=cmsAdmin;Password=2019CMS_Project;MultipleActiveResultSets =False;Encrypt=True;TrustServerCertificate=False;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -f
            services.AddMvc().AddJsonOptions(
            options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddOData();

            var connection = "Server=tcp:cmsproject.database.windows.net,1433;Initial Catalog=CrossMusic;User ID=cmsAdmin;Password=2019CMS_Project;MultipleActiveResultSets =False;Encrypt=True;TrustServerCertificate=False;";
            services.AddDbContext<CrossMusicContext>(options => options.UseSqlServer(connection));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            app.UseMvc(routeBuilder => {

                routeBuilder.EnableDependencyInjection();

                routeBuilder.Expand().Select().OrderBy().Filter().Count().MaxTop(100);

            });
        }
    }
}
