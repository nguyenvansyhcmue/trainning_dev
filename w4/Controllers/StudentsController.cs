using Microsoft.AspNetCore.Mvc;
using w4.Domain.Models;
using w4.Infrastructure;
namespace w4.Controllers;
[ApiController, ApiVersion("1.0"), Route("api/v{version:apiVersion}/students")]
public class StudentsController(InMemoryStore db) : ControllerBase
{
    [HttpGet] public ActionResult<IEnumerable<Student>> GetAll() => Ok(db.Students);
    [HttpGet("{id:int}")] public ActionResult<Student> Get(int id) => db.Students.FirstOrDefault(x=>x.Id==id) is { } x ? Ok(x) : NotFound();
    [HttpPost] public ActionResult<Student> Create(Student value) { value.Id=db.Students.Any()?db.Students.Max(x=>x.Id)+1:1; db.Students.Add(value); return CreatedAtAction(nameof(Get),new { id=value.Id, version="1.0" },value); }
}
