using Abp.Application.Services;
using MyProj.MultiTenancy.Dto;

namespace MyProj.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

