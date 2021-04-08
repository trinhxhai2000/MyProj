using System.Threading.Tasks;
using MyProj.Configuration.Dto;

namespace MyProj.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
