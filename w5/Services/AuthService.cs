using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using w5.Contracts;
using w5.Infrastructure;

namespace w5.Services;

public sealed class AuthService(IUserRepository users, IConfiguration configuration) : IAuthService
{
    public LoginResponse? Login(LoginRequest request)
    {
        var user = users.FindByUsername(request.Username);
        if (user is null || user.Password != request.Password) return null;
        var claims = new[] { new Claim(JwtRegisteredClaimNames.Sub, user.Username), new Claim(ClaimTypes.Name, user.Username), new Claim(ClaimTypes.Role, user.Role) };
        var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");
        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(issuer: configuration["Jwt:Issuer"], audience: configuration["Jwt:Audience"], claims: claims, expires: DateTime.UtcNow.AddMinutes(30), signingCredentials: credentials);
        return new LoginResponse(new JwtSecurityTokenHandler().WriteToken(token), user.Username, user.Role);
    }
}

