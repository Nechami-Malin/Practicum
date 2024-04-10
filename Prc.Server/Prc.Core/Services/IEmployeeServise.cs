using Prc.Core.Entities;
using Prc.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Services
{
    public interface IEmployeeServise
    {
        public Task<IEnumerable<Employee>> GetEmployeesAsync();
        public Task<Employee> GetEmployeeByIdAsync(int id);
        public Task<Employee> AddAsync(Employee employee);
        public Task<Employee> DeleteAsync(int id);
        public Task<Employee> UpdateAsync(int id, Employee employee);

    }
}
