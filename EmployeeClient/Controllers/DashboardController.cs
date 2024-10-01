using Microsoft.AspNetCore.Mvc;

namespace EmployeeClient.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
