using w2.Domain.Models; 

namespace w2.Domain.Interfaces
{
    public interface ICourseRepository
    {
        Course GetById(int id);
        List<Course> GetAll();
    }
}
