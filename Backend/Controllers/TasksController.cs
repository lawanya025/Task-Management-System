using Microsoft.AspNetCore.Mvc;
using TaskManagementBackend.Data;
using TaskManagementBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<Tasks>> PostTasks(Tasks task)
        {
            if (task == null)
            {
                return BadRequest("Task data is invalid.");
            }

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // DELETE: api/tasks
        [HttpDelete]
        public async Task<IActionResult> DeleteTask([FromBody] TaskDeleteRequest request)
        {
            if (request == null || request.Id == 0)
            {
                return BadRequest("Invalid task data.");
            }

            var task = await _context.Tasks.FindAsync(request.Id);
            if (task == null)
            {
                return NotFound($"Task with ID {request.Id} not found.");
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok($"Task with ID {request.Id} deleted successfully.");
        }

        // PATCH: api/tasks/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid task data.");
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }

            task.Status = request.Status;
            task.Priority = request.Priority;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }

    // Request models for delete and update 
    public class TaskDeleteRequest
    {
        public int Id { get; set; }
    }

    public class TaskUpdateRequest
    {
        public string Status { get; set; }
        public string Priority { get; set; }
    }
}