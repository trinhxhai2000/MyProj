using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProj.App.Tinh.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProj.App.Tinh
{
    public class TinhAppService: MyProjAppServiceBase
    {
        private readonly IRepository<TinhEntity> _tinhRepos;
        public TinhAppService(IRepository<TinhEntity> tinhRepos)
        {
            _tinhRepos = tinhRepos;
        }
        [HttpPost]
        public async Task<List<GetAllServerPagingOutputDto>> GetAllServerPaging(GetAllServerPagingInputDto input)
        {
            var query = from tinh in _tinhRepos.GetAll()
                        select new GetAllServerPagingOutputDto
                        {
                            MyProperty = tinh.MyProperty,
                            MyProperty2 = tinh.MyProperty2,
                        };
            return await query.ToListAsync();
        }
    }
}
