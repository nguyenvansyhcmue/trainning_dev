namespace w5.Contracts;

public sealed record LoginResponse(string AccessToken, string Username, string Role);
