namespace w7.Services;

public interface ICachedCatalogService
{
    IReadOnlyCollection<string> GetCourses();
    void ClearCoursesCache();
}
