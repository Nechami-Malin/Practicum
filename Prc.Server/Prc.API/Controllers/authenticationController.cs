using Microsoft.AspNetCore.Mvc;
using Prc.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Prc.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authenticationController : ControllerBase
    {
        // GET: api/<authenticationController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var isValid = await _authService.LoginAsync(login.Name, login.Password);
            if (isValid)
                return Ok(new { message = "Login successful", status = 200 });
            return BadRequest(new { message = "Invalid username or password" });
        }

    }
}
