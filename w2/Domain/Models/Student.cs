namespace w2.Domain.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public List<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
