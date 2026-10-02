# Week 7 — Caching, Logging và Monitoring

W7 kế thừa API JWT từ `w5` bằng `ProjectReference`, sau đó bổ sung caching, structured logging và metrics export.

## API mới

```text
GET    /api/performance/courses       # xem dữ liệu, có cache
DELETE /api/performance/courses/cache # xóa cache, chỉ admin
GET    /metrics                        # metrics cho Prometheus
```

## Chạy local

```powershell
dotnet run --project w7/w7.csproj
```

## Chạy bằng Compose

```powershell
docker compose -f w7/docker-compose.yml up --build
```

API: `http://localhost:5000/swagger`  
Prometheus: `http://localhost:9090`

## Demo cache

1. Gọi `GET /api/performance/courses` lần đầu: log `Cache miss`.
2. Gọi lại lần hai: log `Cache hit`.
3. Đăng nhập admin và gọi `DELETE /api/performance/courses/cache`.
4. Gọi lại courses: cache miss và dữ liệu được nạp lại.

## Clean code kế thừa

- `w5`: authentication, authorization, repository và JWT.
- `w7/Services`: caching layer mới.
- `w7/Controllers`: endpoint performance mới.
- `w7/Program.cs`: đăng ký lại dependency của w5 và thêm monitoring.
- Không sao chép lại source authentication của w5.
