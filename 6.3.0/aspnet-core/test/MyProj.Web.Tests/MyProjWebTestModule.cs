using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyProj.EntityFrameworkCore;
using MyProj.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace MyProj.Web.Tests
{
    [DependsOn(
        typeof(MyProjWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class MyProjWebTestModule : AbpModule
    {
        public MyProjWebTestModule(MyProjEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MyProjWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(MyProjWebMvcModule).Assembly);
        }
    }
}