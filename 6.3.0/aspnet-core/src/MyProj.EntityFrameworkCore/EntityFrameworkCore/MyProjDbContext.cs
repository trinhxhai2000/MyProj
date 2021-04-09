using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MyProj.Authorization.Roles;
using MyProj.Authorization.Users;
using MyProj.MultiTenancy;
using MyProj.App;
using MyProj.App.Huyen;

namespace MyProj.EntityFrameworkCore
{
    public class MyProjDbContext : AbpZeroDbContext<Tenant, Role, User, MyProjDbContext>
    {

        /* Define a DbSet for each entity of the application */
        public DbSet<TinhEntity> TinhEntity { get; set; }
        public DbSet<HuyenEntity> HuyenEntity { get; set; }


        public MyProjDbContext(DbContextOptions<MyProjDbContext> options)
            : base(options)
        {
        }
    }
}
