using Prc.Core.Entities;
using Prc.Core.Repositories;
using Prc.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Services.Services
{
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;   
        }
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }
        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _roleRepository.GetRoleByIdAsync(id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            return await _roleRepository.AddAsync(role);

        }
        public async Task<Role> DeleteAsync(int id)
        {
            return await _roleRepository.DeleteAsync(id);

        }
        public async Task<Role> UpdateAsync(int id, Role role)
        {
            return await _roleRepository.UpdateAsync(id,role);

        }
    }
}
