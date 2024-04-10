using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Services
{
    public interface IRoleService
    {
        public Task<IEnumerable<Role>> GetRolesAsync();
        public Task<Role> GetRoleByIdAsync(int id);
        public Task<Role> AddAsync(Role role);
        public Task<Role> DeleteAsync(int id);
        public Task<Role> UpdateAsync(int id, Role role);

    }
}
