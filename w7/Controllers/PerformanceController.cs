using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using w7.Services;

namespace w7.Controllers;

[ApiController]
[Route("api/performance")]
public sealed class PerformanceController(ICachedCatalogService catalogService) : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("courses")]
    public IActionResult GetCourses() => Ok(catalogService.GetCourses());

    [Authorize(Roles = "admin")]
    [HttpDelete("courses/cache")]
    public IActionResult ClearCoursesCache()
    {
        catalogService.ClearCoursesCache();
        return NoContent();
    }
}
