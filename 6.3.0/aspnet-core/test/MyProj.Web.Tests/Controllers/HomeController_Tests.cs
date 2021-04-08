using System.Threading.Tasks;
using MyProj.Models.TokenAuth;
using MyProj.Web.Controllers;
using Shouldly;
using Xunit;

namespace MyProj.Web.Tests.Controllers
{
    public class HomeController_Tests: MyProjWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}