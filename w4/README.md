# W4 – RESTful API và Integration Testing

## Chạy API

```powershell
dotnet restore
dotnet run --environment Development
```

- Swagger: `https://localhost:<port>/swagger`
- API mẫu: `GET /api/v1/students`, `GET /api/v1/courses`, `GET /api/v1/enrollments`, `GET /api/v1/scores`
- POST dùng JSON body tương ứng với model.

## Postman

Import các endpoint trên, tạo collection `W4 API`, sau đó kiểm tra lần lượt GET danh sách, POST student/course, POST enrollment và POST score.
