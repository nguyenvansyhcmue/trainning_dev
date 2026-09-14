using w2.Domain.Interfaces;
using w2.Domain.Models;

namespace w2.Domain.Services
{
    public class EnrollmentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRepository;

        public EnrollmentService(IStudentRepository studentRepository, ICourseRepository courseRepository)
        {
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
        }

        public Enrollment RegisterStudentToCourse(int studentId, int courseId)
        {
            var student = _studentRepository.GetById(studentId);
            if (student == null) 
                throw new Exception("Học viên không tồn tại trên hệ thống!");

            var course = _courseRepository.GetById(courseId);
            if (course == null) 
                throw new Exception("Khóa học không hợp lệ hoặc đã bị xóa!");

            var newEnrollment = new Enrollment
            {
                StudentId = studentId,
                CourseId = courseId,
                EnrollDate = DateTime.Now,
                Student = student,
                Course = course
            };

            student.Enrollments.Add(newEnrollment);
            _studentRepository.Save(student);

            return newEnrollment;
        }
    }
}
