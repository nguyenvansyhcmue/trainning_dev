using w5.Contracts;

namespace w5.Services;

public interface IAuthService
{
    LoginResponse? Login(LoginRequest request);
}
