using AutoMapper;
using Prc.Core.DTOs;
using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Mapping
{
    public class CoreMappingProfile:Profile
    {
        public CoreMappingProfile()
        {
            CreateMap<EmployeeDTO, Employee>().ReverseMap();
            CreateMap<RoleDTO, Role>().ReverseMap();
            CreateMap<EmployeeRoleDTO, EmploeeRole>().ReverseMap();

        }
    }
}
