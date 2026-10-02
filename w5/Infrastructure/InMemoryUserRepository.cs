using w5.Domain.Models;

namespace w5.Infrastructure;

public sealed class InMemoryUserRepository : IUserRepository
{
    private readonly IReadOnlyDictionary<string, User> users = new Dictionary<string, User>(StringComparer.OrdinalIgnoreCase)
    {
        ["admin"] = new("admin", "123456", "admin"),
        ["student"] = new("student", "123456", "user")
    };

    public User? FindByUsername(string username) => users.GetValueOrDefault(username);
    public IReadOnlyCollection<string> GetUsernames() => users.Keys.ToArray();
}
