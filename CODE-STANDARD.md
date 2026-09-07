# Coding Standard

## 1. Quy tắc đặt tên

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| Class | PascalCase | `CourseService` |
| Method | PascalCase | `GetCourse()` |
| Property | PascalCase | `CourseName` |
| Biến local | camelCase | `courseName` |
| Tham số | camelCase | `courseId` |
| Private field | _camelCase | `_courseId` |
| Interface | Bắt đầu bằng I | `ICourseService` |

## 2. Ví dụ đúng

```csharp
public class CourseService
{
    private readonly int _courseId;

    public string GetCourseName(int courseId)
    {
        var courseName = "ASP.NET Core";

        return courseName;
    }
}