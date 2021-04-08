using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MyProj.Configuration;
using MyProj.Web;

namespace MyProj.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MyProjDbContextFactory : IDesignTimeDbContextFactory<MyProjDbContext>
    {
        public MyProjDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MyProjDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MyProjDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MyProjConsts.ConnectionStringName));

            return new MyProjDbContext(builder.Options);
        }
    }
}
