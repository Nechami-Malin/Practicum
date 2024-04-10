using Microsoft.EntityFrameworkCore;
using Prc.Core.Entities;
using Prc.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }
        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _context.Roles.FindAsync(id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }
        public async Task<Role> DeleteAsync(int id)
        {
            Role role = await _context.Roles.FindAsync(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
            return role;
        }
        public async Task<Role> UpdateAsync(int id, Role role)
        {
            var existRole = await _context.Roles.FindAsync(id);
            if (existRole != null)
            {
                existRole.Description = role.Description;
                await _context.SaveChangesAsync();
            }
            return existRole;
        }
    }
}
