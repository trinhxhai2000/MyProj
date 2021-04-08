using System.Threading.Tasks;
using Abp.Application.Services;
using MyProj.Authorization.Accounts.Dto;

namespace MyProj.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
