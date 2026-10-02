using System.ComponentModel.DataAnnotations;

namespace w5.Contracts;

public sealed class LoginRequest
{
    [Required, MinLength(3)] public string Username { get; init; } = string.Empty;
    [Required, MinLength(6)] public string Password { get; init; } = string.Empty;
}
