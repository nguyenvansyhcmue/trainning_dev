using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using w4.Domain.Models;
using Xunit;

namespace w4.Tests;

public class W4ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    public W4ApiTests(WebApplicationFactory<Program> factory) => _client = factory.CreateClient();

    [Fact]
    public async Task GetStudents_ReturnsSeedStudent()
    {
        var response = await _client.GetAsync("/api/v1/students");
        response.EnsureSuccessStatusCode();
        var students = await response.Content.ReadFromJsonAsync<List<Student>>();
        Assert.NotNull(students);
        Assert.Contains(students, x => x.Id == 1 && x.Name == "Nguyen Van Sy");
    }

    [Fact]
    public async Task CreateStudentAndCourse_ReturnsCreated()
    {
        var student = await _client.PostAsJsonAsync("/api/v1/students", new Student { Name = "Test Student", Email = "test@example.com" });
        var course = await _client.PostAsJsonAsync("/api/v1/courses", new Course { Title = "Integration Testing", Price = 100000 });
        Assert.Equal(HttpStatusCode.Created, student.StatusCode);
        Assert.Equal(HttpStatusCode.Created, course.StatusCode);
    }

    [Fact]
    public async Task EnrollmentThenScore_CompletesSuccessfully()
    {
        var enrollmentResponse = await _client.PostAsJsonAsync("/api/enrollments", new Enrollment { StudentId = 1, CourseId = 1 });
        var enrollment = await enrollmentResponse.Content.ReadFromJsonAsync<Enrollment>();
        Assert.Equal(HttpStatusCode.Created, enrollmentResponse.StatusCode);
        Assert.NotNull(enrollment);
        var scoreResponse = await _client.PostAsJsonAsync("/api/v1/scores", new Score { EnrollmentId = enrollment!.Id, Value = 8.5m });
        Assert.Equal(HttpStatusCode.Created, scoreResponse.StatusCode);
    }

    [Fact]
    public async Task EnrollmentWithMissingStudentOrCourse_ReturnsBadRequest()
    {
        var response = await _client.PostAsJsonAsync("/api/enrollments", new Enrollment { StudentId = 999, CourseId = 999 });
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task ScoreWithMissingEnrollment_ReturnsBadRequest()
    {
        var response = await _client.PostAsJsonAsync("/api/v1/scores", new Score { EnrollmentId = 999, Value = 5 });
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
