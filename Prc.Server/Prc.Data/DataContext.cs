using Microsoft.EntityFrameworkCore;
using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Employee> Employees { get; set; }   
        public DbSet<Role> Roles { get; set; }   
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=mng_workers");
        }
    }
}
