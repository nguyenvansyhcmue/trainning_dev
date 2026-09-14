using Moq;
using Xunit;
using w2.Domain.Interfaces; 
using w2.Domain.Services;  
using w2.Domain.Models;     

namespace w2.Tests
{
    public class EnrollmentServiceTests
    {
        public void RegisterStudentToCourse_Should_Create_Enrollment_When_Data_Is_Valid()
        {
            var mockStudentRepo = new Mock<IStudentRepository>();
            var mockCourseRepo = new Mock<ICourseRepository>();

            var sampleStudent = new Student { StudentId = 1, Name = "Nguyen Van Sy", Email = "sy@example.com" };
            var sampleCourse = new Course { CourseId = 10, Title = "Học nhạc lý cơ bản", Price = 500000 };

            mockStudentRepo.Setup(repo => repo.GetById(1)).Returns(sampleStudent);
            
            mockCourseRepo.Setup(repo => repo.GetById(10)).Returns(sampleCourse);

            var enrollmentService = new EnrollmentService(mockStudentRepo.Object, mockCourseRepo.Object);

            var result = enrollmentService.RegisterStudentToCourse(1, 10);

            Assert.NotNull(result); // Lượt đăng ký tạo ra phải tồn tại (không bị null)
            Assert.Equal(1, result.StudentId); // Mã học viên trong lượt đăng ký phải là 1
            Assert.Equal(10, result.CourseId); // Mã khóa học trong lượt đăng ký phải là 10
            Assert.Equal("Nguyen Van Sy", result.Student.Name); // Tên học viên phải khớp
            
            mockStudentRepo.Verify(repo => repo.Save(It.IsAny<Student>()), Times.Once);
        }
        [Fact] // Kịch bản 2: Kiểm tra xem hệ thống có chặn lại khi Học viên không tồn tại không
        public void RegisterStudentToCourse_Should_Throw_Exception_When_Student_Not_Found()
        {
            // Arrange (Sắp xếp)
            var mockStudentRepo = new Mock<IStudentRepository>();
            var mockCourseRepo = new Mock<ICourseRepository>();

            // Giả lập: Tìm học viên mã số 999 -> Trả về null (Không tìm thấy)
            mockStudentRepo.Setup(repo => repo.GetById(999)).Returns((Student)null);

            var enrollmentService = new EnrollmentService(mockStudentRepo.Object, mockCourseRepo.Object);

            // Act & Assert (Hành động và Kiểm tra)
            // Hệ thống phải ném ra một lỗi (Exception) có chứa chữ "Học viên không tồn tại"
            var exception = Assert.Throws<Exception>(() => enrollmentService.RegisterStudentToCourse(999, 10));
            Assert.Contains("Học viên không tồn tại", exception.Message);
        }

    }
}
