using Prc.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Services.Services
{
    public class AuthenticationService:IAuthService
    {
        public async Task<bool> LoginAsync(string username, string password)
        {
            return username == "admin" && password == "123456";
        }
    }
}
