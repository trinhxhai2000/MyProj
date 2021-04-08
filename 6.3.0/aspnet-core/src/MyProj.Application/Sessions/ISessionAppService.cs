using System.Threading.Tasks;
using Abp.Application.Services;
using MyProj.Sessions.Dto;

namespace MyProj.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
