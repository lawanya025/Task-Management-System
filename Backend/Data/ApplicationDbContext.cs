using Microsoft.EntityFrameworkCore;
using TaskManagementBackend.Models;

namespace TaskManagementBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Tasks> Tasks { get; set; } // This is the DbSet for TaskItem
    }
}
