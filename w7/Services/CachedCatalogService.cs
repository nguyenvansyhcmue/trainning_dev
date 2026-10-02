using Microsoft.Extensions.Caching.Memory;

namespace w7.Services;

public sealed class CachedCatalogService(IMemoryCache cache, ILogger<CachedCatalogService> logger)
    : ICachedCatalogService
{
    private const string CoursesCacheKey = "catalog:courses";

    public IReadOnlyCollection<string> GetCourses()
    {
        if (cache.TryGetValue(CoursesCacheKey, out IReadOnlyCollection<string>? courses))
        {
            logger.LogInformation("Cache hit for {CacheKey}", CoursesCacheKey);
            return courses!;
        }

        logger.LogInformation("Cache miss for {CacheKey}; loading source data", CoursesCacheKey);
        courses = ["Clean Code", "JWT Security", "Docker CI/CD"];
        cache.Set(CoursesCacheKey, courses, TimeSpan.FromMinutes(5));
        return courses!;
    }

    public void ClearCoursesCache()
    {
        cache.Remove(CoursesCacheKey);
        logger.LogInformation("Cache removed for {CacheKey}", CoursesCacheKey);
    }
}


