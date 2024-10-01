using System.ComponentModel.DataAnnotations;

namespace EmployeeData.Models
{
    public class Employee
    {
        public string EmployeeId { get; set; }

        //each model (table) must declare primary key (PK)
        //But, if the PK named by Id or Model+Id, it will automatically detect as PK
        //if it's not, write [Key] above the primary key

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Gender gender { get; set; }
        public int Salary { get; set; }
        public bool isEmployee { get; set; }
        public DateTime JoinDate { get; set; }
    }

    public enum Gender
    {
        male,
        female
    }
    
}
