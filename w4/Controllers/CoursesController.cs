using Microsoft.AspNetCore.Mvc;
using w4.Domain.Models;
using w4.Infrastructure;
namespace w4.Controllers;
[ApiController, ApiVersion("1.0"), Route("api/v{version:apiVersion}/courses")]
public class CoursesController(InMemoryStore db) : ControllerBase
{
    [HttpGet] public ActionResult<IEnumerable<Course>> GetAll() => Ok(db.Courses);
    [HttpGet("{id:int}")] public ActionResult<Course> Get(int id) => db.Courses.FirstOrDefault(x=>x.Id==id) is { } x ? Ok(x) : NotFound();
    [HttpPost] public ActionResult<Course> Create(Course value) { value.Id=db.Courses.Any()?db.Courses.Max(x=>x.Id)+1:1; db.Courses.Add(value); return CreatedAtAction(nameof(Get),new { id=value.Id, version="1.0" },value); }
}
