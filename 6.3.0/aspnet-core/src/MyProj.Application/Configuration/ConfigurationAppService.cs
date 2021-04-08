using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MyProj.Configuration.Dto;

namespace MyProj.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MyProjAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
