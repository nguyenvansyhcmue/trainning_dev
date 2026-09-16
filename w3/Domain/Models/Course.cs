namespace w3.Domain.Models;

public class Course
{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public List<Enrollment> Enrollments { get; set; } = new();
}
