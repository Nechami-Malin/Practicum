using Microsoft.EntityFrameworkCore;
using Prc.Core.Entities;
using Prc.Core.Repositories;


namespace Prc.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ThenInclude(em => em.Role).ToListAsync();
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Roles).ThenInclude(em => em.Role).FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            var emp = await _context.Employees.FirstOrDefaultAsync(emp => emp.IDNumber == employee.IDNumber);
            if (emp == null)
            {
                employee.Roles = employee.Roles.GroupBy(r => r.RoleId).Select(g => g.First()).ToList();
                await _context.Employees.AddAsync(employee);
                employee.IsActive = true;
                await _context.SaveChangesAsync();

            }
            return employee;
        }
        public async Task<Employee> DeleteAsync(int id)
        {
            Employee employee;
            employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                employee.IsActive = false;
                await _context.SaveChangesAsync();
            }
            return employee;
        }
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            Employee existEmployee = await _context.Employees.Include(e => e.Roles)
               .FirstOrDefaultAsync(e => e.Id == id);
            if (existEmployee != null)
            {
                existEmployee.FirstName = employee.FirstName;
                existEmployee.LastName = employee.LastName;
                existEmployee.IDNumber = employee.IDNumber;
                existEmployee.BirthDate = employee.BirthDate;
                existEmployee.EntryWorkDate = employee.EntryWorkDate;
                existEmployee.IsActive = true;
                existEmployee.Roles = employee.Roles.GroupBy(r => r.RoleId).Select(e => e.First()).ToList();
                await _context.SaveChangesAsync();
            }
            return existEmployee;
        }
    }
}
