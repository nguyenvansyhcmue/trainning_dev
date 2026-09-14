namespace w2.Domain.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }

        public List<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
