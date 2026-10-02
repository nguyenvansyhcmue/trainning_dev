using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using w5.Contracts;
using w5.Services;

namespace w5.Controllers;

[ApiController]
[Route("auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    [EnableRateLimiting("login")]
    public IActionResult Login(LoginRequest request)
    {
        var response = authService.Login(request);
        return response is null ? Unauthorized(new { message = "Username hoặc password không đúng" }) : Ok(response);
    }
}




