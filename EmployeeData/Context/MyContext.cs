using EmployeeData.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeData.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
        //define each model that we have
        public DbSet<Employee> employees { get; set; }
    }
}
