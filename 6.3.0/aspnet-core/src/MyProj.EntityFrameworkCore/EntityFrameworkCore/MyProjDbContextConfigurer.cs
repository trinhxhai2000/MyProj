using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MyProj.EntityFrameworkCore
{
    public static class MyProjDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MyProjDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MyProjDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
