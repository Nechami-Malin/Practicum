using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Prc.API.Models;
using Prc.Core.DTOs;
using Prc.Core.Entities;
using Prc.Core.Services;
using Prc.Data.Repositories;
using Prc.Services;
using Prc.Services.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Prc.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private readonly IEmployeeServise _employeesService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeServise employeesService, IMapper mapper)
        {
            this._employeesService = employeesService;
            this._mapper = mapper;
        }

        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> Get()
        {
            var emp = await _employeesService.GetEmployeesAsync();
            var empDTO = emp.Select(e => _mapper.Map<EmployeeDTO?>(e));
            return Ok(empDTO);
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var res = await _employeesService.GetEmployeeByIdAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : NotFound(resDto);
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _employeesService.AddAsync(employee);
            var resExist = await _employeesService.GetEmployeeByIdAsync(res.Id);
            var resDto = _mapper.Map<EmployeeDTO>(resExist);
            return Ok(resDto);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _employeesService.UpdateAsync(id, employee);
            var resExist = await _employeesService.GetEmployeeByIdAsync(res.Id);
            var resDto = _mapper.Map<EmployeeDTO>(resExist);
            return Ok(resDto);
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var res =await _employeesService.DeleteAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);

        }
    }
}

