using w5.Domain.Models;

namespace w5.Infrastructure;

public interface IUserRepository
{
    User? FindByUsername(string username);
    IReadOnlyCollection<string> GetUsernames();
}
