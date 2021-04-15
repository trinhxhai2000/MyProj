using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProj.App.Huyen.Dto;
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

namespace MyProj.App.Huyen
{
    public class HuyenAppService : MyProjAppServiceBase
    {
        // maybe need tinh repo to check existing of tinhId
        private readonly IRepository<TinhEntity> _tinhRepos;
        private readonly IRepository<HuyenEntity> _huyenRepos;
        public HuyenAppService(IRepository<HuyenEntity> huyenRepos, IRepository<TinhEntity> tinhRepos)
        {
            _huyenRepos = huyenRepos;
            _tinhRepos = tinhRepos;

        }


        [HttpPost]
        public async Task<ActionResult<List<HuyenDTO>>> GetAllHuyenByTinhId(GetHuyenByTinhIdDto input)
        {

            var tinh = await _tinhRepos.FirstOrDefaultAsync(tinh => tinh.Id == input.TinhId);
            if (tinh == null)
            {
                return new NotFoundResult();
            }

            var query = from huyen in _huyenRepos.GetAll()
                        where huyen.TinhEntityId == input.TinhId
                        select new HuyenDTO(huyen);

            return await query.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<HuyenDTO>> AddHuyen(ModifingHuyenInput input)
        {
            var tinh = await _tinhRepos.FirstOrDefaultAsync(tinh => tinh.Id == input.TinhId);

            if (tinh == null)
            {
                return new NotFoundResult();
            }

            await _huyenRepos.InsertAsync(
                 new HuyenEntity
                 {
                     name = input.name,
                     TinhEntity = tinh,
                     TinhEntityId = input.TinhId
                 }
                 );
            return new OkResult();
        }

        [HttpPost]
        public async Task<ActionResult<HuyenDTO>> GetHuyen(int id)
        {

            var query = from huyen in _huyenRepos.GetAll() 
                              select huyen;

            var listhuyen = await query.ToListAsync();
            HuyenEntity curHuyen = listhuyen.FirstOrDefault(huyen => huyen.Id == id);
            if (curHuyen == null)
            {
                return new NotFoundResult();
            }
            curHuyen.TinhEntity = await _tinhRepos.GetAll().FirstOrDefaultAsync(tinh => tinh.Id == curHuyen.TinhEntityId);
            
            return new HuyenDTO(curHuyen);
        }

        public async Task<ActionResult<HuyenDTO>> DeleteHuyen(HuyenIdInput huyenIdInput)
        {
            //CheckDeletePermission();
            var huyen = await _huyenRepos.FirstOrDefaultAsync(huyen => huyen.Id == huyenIdInput.id);
            if (huyen == null) return new NotFoundResult();
            await _huyenRepos.DeleteAsync(huyen);
            return new OkResult();
        }

        [HttpPost]
        public async Task<ActionResult<TinhDTO>> UpdateHuyen(ModifingHuyenInput updateHuyenInput)
        {
            //CheckDeletePermission();
            var curHuyen = await _huyenRepos.FirstOrDefaultAsync(h => h.Id == updateHuyenInput.HuyenId);
            if (curHuyen == null) return new NotFoundResult();
            curHuyen.name = updateHuyenInput.name;

            var tinh = await _tinhRepos.FirstOrDefaultAsync(tinh => tinh.Id == updateHuyenInput.TinhId);
            if (tinh == null) return new NotFoundResult();

            curHuyen.TinhEntity = tinh;

            await _huyenRepos.UpdateAsync(curHuyen);
            return new OkResult();
        }


        [HttpPost]
        public async Task<ActionResult<bool>> huyenNameExistInTinh(int tinhId, string huyenName)
        {
            //CheckDeletePermission();
            var curHuyen = _huyenRepos.FirstOrDefault(h => h.name == huyenName && h.TinhEntityId == tinhId);

            return (curHuyen != null) ;
        }
        [HttpPost]
        public async Task<ActionResult<getHuyenPageOut>> getHuyenPage(getHuyenPageInp input)
        {

            var tinh = await _tinhRepos.FirstOrDefaultAsync(tinh => tinh.Id == input.tinhId);
            if (tinh == null)
            {
                return new NotFoundResult();
            }

            var res = new getHuyenPageOut();

            var query_count = from h in _huyenRepos.GetAll()
                        where h.TinhEntityId == input.tinhId
                        select h;

            res.total = await query_count.CountAsync();

            var query = query_count.Skip(input.numPage * (input.idx - 1))
                        .Take(input.numPage)
                        .Select(
                            h => new HuyenDTO(h)
                        );

            res.huyens = await query.ToListAsync();
            return res;
        }
    }
}
