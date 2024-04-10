using Prc.Core.Entities;

namespace Prc.API.Models
{
    public class EmployeeRolePostModel
    {
        public int RoleId { get; set; }
        //public RolePostModel Role { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
    }
}
