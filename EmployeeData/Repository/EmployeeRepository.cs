using EmployeeData.Context;
using EmployeeData.Models;
using EmployeeData.Models.ViewModels;
using EmployeeData.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EmployeeData.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly MyContext _context;
        public EmployeeRepository(MyContext context)
        {
            _context = context;
        }
        public int AddEmployee(Employee employee)
        {
            Employee empData = new Employee
            {
                EmployeeId = employee.EmployeeId,
                Firstname = employee.Firstname,
                Lastname = employee.Lastname,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                gender = employee.gender,
                Salary = employee.Salary,
                JoinDate = DateTime.Now,
                isEmployee = true
            };

            var add = _context.employees.Add(empData);
            if(add != null)
            {
                return _context.SaveChanges();
            }
            return 0;
        }

        public int DeleteEmployee(string empId)
        {
            var getId = GetEmployeeById(empId);
            if (getId != null)
            {
                getId.isEmployee = false;
                _context.Entry(getId).State = EntityState.Modified;
                return _context.SaveChanges();
            }
            return 0;
        }

        public int EditEmployee(Employee employee)
        {
            var data = _context.employees.Find(employee.EmployeeId);
            employee.isEmployee = data.isEmployee;
            employee.JoinDate = data.JoinDate;
            _context.Entry(data).State = EntityState.Detached;
            _context.Entry(employee).State = EntityState.Modified;
            return _context.SaveChanges();
        }

        public Employee GetEmployeeById(string empId)
        {
            var getId = _context.employees.Where(e=>e.EmployeeId == empId && e.isEmployee == true).SingleOrDefault();
            if(getId != null)
            {
                return getId;
            }
            return null;
        }

        public IEnumerable<Employee> GetEmployeesData()
        {
            var getAll = _context.employees.ToList().Where(e => e.isEmployee == true);
            if(getAll.Count() > 0)
            {
                return getAll;
            }
            return null;
        }

        public IEnumerable<GenderVM> GetCountGender()
        {
            var getAll = _context.employees
                .GroupBy(e => e.gender) 
                .Select(g => new GenderVM 
                {
                    Gender = g.Key.ToString(),
                    countGender = g.Count()
                })
                .ToList();

            if (getAll == null || !getAll.Any())
            {
                return null; 
            }

            return getAll;
        }
    }
}
