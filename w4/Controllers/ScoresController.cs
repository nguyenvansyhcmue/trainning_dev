using Microsoft.AspNetCore.Mvc;
using w4.Domain.Models;
using w4.Infrastructure;
namespace w4.Controllers;
[ApiController, ApiVersion("1.0"), Route("api/v{version:apiVersion}/scores")]
public class ScoresController(InMemoryStore db) : ControllerBase
{
    [HttpGet] public ActionResult<IEnumerable<Score>> GetAll() => Ok(db.Scores);
    [HttpPost] public ActionResult<Score> Create(Score value) { if(!db.Enrollments.Any(x=>x.Id==value.EnrollmentId)) return BadRequest("Enrollment không tồn tại"); value.Id=db.Scores.Count+1; db.Scores.Add(value); return Created("api/v1/scores/"+value.Id,value); }
}
