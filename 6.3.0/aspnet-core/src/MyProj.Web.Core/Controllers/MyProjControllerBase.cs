using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MyProj.Controllers
{
    public abstract class MyProjControllerBase: AbpController
    {
        protected MyProjControllerBase()
        {
            LocalizationSourceName = MyProjConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
