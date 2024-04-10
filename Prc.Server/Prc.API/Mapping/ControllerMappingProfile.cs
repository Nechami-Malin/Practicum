using AutoMapper;
using Prc.API.Models;
using Prc.Core.Entities;
using System.ComponentModel.Design;

namespace Prc.API.Mapping
{
    public class ControllerMappingProfile:Profile
    {
        public ControllerMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeeRolePostModel, EmploeeRole>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();

        }
    }
}
