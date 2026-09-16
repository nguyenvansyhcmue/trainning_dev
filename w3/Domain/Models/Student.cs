namespace w3.Domain.Models;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public List<Enrollment> Enrollments { get; set; } = new();
}
