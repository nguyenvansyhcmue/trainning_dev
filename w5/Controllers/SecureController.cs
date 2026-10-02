using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using w5.Infrastructure;

namespace w5.Controllers;

[ApiController]
[Route("api")]
public sealed class SecureController(IUserRepository users) : ControllerBase
{
    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile() => Ok(new
    {
        message = "Báº¡n Ä‘Ã£ Ä‘Äƒng nháº­p thÃ nh cÃ´ng",
        username = User.FindFirstValue(ClaimTypes.Name),
        role = User.FindFirstValue(ClaimTypes.Role)
    });

    [Authorize(Roles = "admin")]
    [HttpGet("admin/users")]
    public IActionResult AdminUsers() => Ok(users.GetUsernames());
}

