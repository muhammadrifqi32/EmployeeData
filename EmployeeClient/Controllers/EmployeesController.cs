using Microsoft.AspNetCore.Mvc;

namespace EmployeeClient.Controllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
