using EmployeeData.Models;

namespace EmployeeData.Repository.Interface
{
    public interface IEmployeeRepository
    {
        public IEnumerable<Employee> GetEmployeesData();
        public Employee GetEmployeeById(string empId);
        public int AddEmployee(Employee employee);
        public int EditEmployee(Employee employee);
        public int DeleteEmployee(string empId);
    }
}
