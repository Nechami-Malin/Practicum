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
    public class EmployeesService : IEmployeeServise
    {
        private readonly IEmployeeRepository _employeesRepository;

        public EmployeesService(IEmployeeRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _employeesRepository.GetEmployeesAsync();
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeesRepository.GetEmployeeByIdAsync(id);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeesRepository.AddAsync(employee);
        }
        public async Task<Employee> DeleteAsync(int id)
        {
            return await _employeesRepository.DeleteAsync(id);
        }
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
           return await _employeesRepository.UpdateAsync(id, employee);
        }
    }
}
