namespace TaskManagementBackend.Models
{
    public class Tasks
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public DateTime DueDate { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
    }
}
