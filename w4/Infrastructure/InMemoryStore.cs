using w4.Domain.Models;
namespace w4.Infrastructure;
public class InMemoryStore
{
    public List<Student> Students { get; } = [new() { Id=1, Name="Nguyen Van Sy", Email="sy@example.com" }];
    public List<Course> Courses { get; } = [new() { Id=1, Title="ASP.NET Core", Price=500000 }];
    public List<Enrollment> Enrollments { get; } = [];
    public List<Score> Scores { get; } = [];
}
