using Abp.Authorization;
using MyProj.Authorization.Roles;
using MyProj.Authorization.Users;

namespace MyProj.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
