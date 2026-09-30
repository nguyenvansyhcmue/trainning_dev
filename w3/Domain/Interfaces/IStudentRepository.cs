using w3.Domain.Models; namespace w3.Domain.Interfaces; public interface IStudentRepository { Student? GetById(int id); void Save(Student student); }
