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
        public async Task<List<TinhDTO>> GetAllServerPaging(TinhDTO input)
        {
            var query = from tinh in _tinhRepos.GetAll()
                        select new TinhDTO
                        {
                            Id = tinh.Id,
                            name = tinh.name,
                            TTTU = tinh.TTTU,
                        };
            return await query.ToListAsync();
        }

        // POST: api/TodoItems
        [HttpPost]
        public void PostTodoItem(TinhDTO input)
        {
            _tinhRepos.Insert(
                new TinhEntity
                {
                    name = input.name,
                    TTTU = input.TTTU
                }
                );
        }

        [HttpPost]
        public async Task<TinhDTO> GetTinh(TinhDTO input)
        {
            var query = from tinh in _tinhRepos.GetAll()
                        where tinh.Id == input.Id
                        select new TinhDTO()
                        {
                            name = tinh.name,
                            TTTU = tinh.TTTU
                        } ;

            return await query.SingleAsync();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
