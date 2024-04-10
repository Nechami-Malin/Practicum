using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Entities
{
    public enum Gender { Male = 1, Female }

    public class Employee
    {
        public int Id { get; set; }
        public string IDNumber { get; set; } 
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime EntryWorkDate { get; set; }
        public bool IsActive { get; set; }
        public List<EmploeeRole> Roles { get; set; }
    }
}
