using Microsoft.AspNetCore.Mvc;
using w4.Domain.Models;
using w4.Infrastructure;
namespace w4.Controllers;
[ApiController, ApiVersion("1.0"), Route("api/enrollments")]
public class EnrollmentsController(InMemoryStore db) : ControllerBase
{
    [HttpGet] public ActionResult<IEnumerable<Enrollment>> GetAll() => Ok(db.Enrollments);
    [HttpPost] public ActionResult<Enrollment> Create(Enrollment value) { if(!db.Students.Any(x=>x.Id==value.StudentId)||!db.Courses.Any(x=>x.Id==value.CourseId)) return BadRequest("Student hoặc course không tồn tại"); value.Id=db.Enrollments.Count+1; value.EnrolledAt=DateTime.UtcNow; db.Enrollments.Add(value); return Created("api/v1/enrollments/"+value.Id,value); }
}
