using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProj.App.Tinh.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
        public async Task<List<TinhDTO>> GetAllTinh()
        {
            var query = from tinh in _tinhRepos.GetAll()
                        select new TinhDTO(tinh);
            return await query.ToListAsync();
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TinhDTO>> PostTodoItem(TinhDTO input)
        {
            // does id is exist ? latter
           await _tinhRepos.InsertAsync(
                new TinhEntity
                {
                    name = input.name,
                    TTTU = input.TTTU
                }
                );
            return new OkResult();
        }

        [HttpPost]
        public async Task<ActionResult<TinhDTO>> GetTinh(int id)
        {
            var query = from tinh in _tinhRepos.GetAll()
                        select tinh;
            var curTinh = await query.FirstOrDefaultAsync(tinh => tinh.Id == id);
            if (curTinh == null)
            {
                return new NotFoundResult();
            }

            return new TinhDTO(curTinh);
        }
        [HttpDelete]

        public async Task<ActionResult<TinhDTO>> DeleteTinh(TinhIdInput input)
        {
            //CheckDeletePermission();
            var tinh = await _tinhRepos.FirstOrDefaultAsync(tinh => tinh.Id == input.id);
            if (tinh == null) return new NotFoundResult();
            await _tinhRepos.DeleteAsync(tinh);
            return new OkResult();
        }

        [HttpPost]
        public async Task<ActionResult<TinhDTO>> UpdateTinh(TinhDTO tinh)
        {
            //CheckDeletePermission();
            var curTinh = await _tinhRepos.FirstOrDefaultAsync(t => t.Id == tinh.TinhId);
            if (curTinh == null) return new NotFoundResult();
            curTinh.name = tinh.name;
            curTinh.TTTU = tinh.TTTU;
            await _tinhRepos.UpdateAsync(curTinh);
            return new OkResult();

        }
        [HttpPost]
        public async Task<ActionResult<bool>> tinhNameExist(string name)
        {
            //CheckDeletePermission();
            var curTinh = await _tinhRepos.FirstOrDefaultAsync(t => t.name == name);
            return (curTinh != null);

        }
        [HttpPost]
        public async Task<ActionResult<getTinhPageOut>> getTinhPage(getTinhPageInp input)
        {
            //    CheckDeletePermission();
            //later: check if idx page runout of current amount => fine with no err
            var res = new getTinhPageOut();
            
            var queryResultPage = await _tinhRepos.GetAll()
                .Skip(input.numPage * (input.idx - 1))
                .Take(input.numPage).Select(
                tinh =>
                new TinhDTO
                {
                    TinhId = tinh.Id,
                    name = tinh.name,
                    TTTU = tinh.TTTU,
                }
               
                ).ToListAsync();
            res.total = _tinhRepos.Count();
            res.tinhs = queryResultPage;

            return res;
        }


    }
}
