using w2.Domain.Models;

namespace w2.Domain.Interfaces
{
    // Interface chỉ định nghĩa các nút bấm, không viết code xử lý bên trong
    public interface IStudentRepository
    {
        Student GetById(int id);
        void Save(Student student);
    }
}
