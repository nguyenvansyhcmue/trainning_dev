using w3.Domain.Models; namespace w3.Domain.Interfaces; public interface ICourseRepository { Course? GetById(int id); IReadOnlyList<Course> GetAll(); }
