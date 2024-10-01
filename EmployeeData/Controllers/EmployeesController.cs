using EmployeeData.Models;
using EmployeeData.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EmployeeData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        public EmployeesController(EmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IActionResult GetEmployeesData()
        {
            try
            {
                var employees = _employeeRepository.GetEmployeesData();
                if (employees == null)
                {
                    return NotFound(new { status = HttpStatusCode.NotFound, message = "No employees found" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Employees successfully retrieved", data = employees });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving universities: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            try
            {
                var employees = _employeeRepository.AddEmployee(employee);
                if (employees == 0)
                {
                    return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Failed to Add Employee" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Succesfully Add Employee", data = new List<Employee>() });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving employees: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }

        [HttpGet("{empId}")]
        public IActionResult GetEmployeesById(string empId)
        {
            try
            {
                var employees = _employeeRepository.GetEmployeeById(empId);
                if (employees == null)
                {
                    return NotFound(new { status = HttpStatusCode.NotFound, message = "No employees found" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Employees successfully retrieved", data = employees });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving universities: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }

        [HttpPatch]
        public IActionResult EditEmployee(Employee employee)
        {
            try
            {
                var employees = _employeeRepository.EditEmployee(employee);
                if (employees == 0)
                {
                    return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Failed to Edit Employee" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Succesfully Edit Employee", data = new List<Employee>() });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving employees: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }

        [HttpPatch("{empId}")]
        public IActionResult DeleteEmployee(string empId)
        {
            try
            {
                var employees = _employeeRepository.DeleteEmployee(empId);
                if (employees == 0)
                {
                    return NotFound(new { status = HttpStatusCode.NotFound, message = "No employees found" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Employees successfully Deleted", data = employees });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving universities: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }

        [HttpGet("gender-count")]
        public IActionResult GetGenderCount()
        {
            try
            {
                var genderCounts = _employeeRepository.GetCountGender();
                if (genderCounts == null || !genderCounts.Any())
                {
                    return NotFound(new { status = HttpStatusCode.NotFound, message = "No data found" });
                }
                return Ok(new { status = HttpStatusCode.OK, message = "Gender counts successfully retrieved", data = genderCounts });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"An error occurred while retrieving gender counts: {ex.Message}");

                return StatusCode(500, new { status = "error", message = ex.Message, code = "500" });
            }
        }
    }
}
