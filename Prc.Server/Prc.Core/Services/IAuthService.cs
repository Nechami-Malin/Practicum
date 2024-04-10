using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Services
{
    public interface IAuthService
    {
        public Task<bool> LoginAsync(string username, string password);

    }
}
