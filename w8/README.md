# W8 - Angular, RxJS, NgRx và Full-stack Flow

Frontend Angular standalone kết nối API W5/W7.

## Kiến trúc

```text
features/       màn hình và component theo nghiệp vụ
core/models/    contract dữ liệu
core/services/  HTTP và token storage
core/interceptors/ tự động gắn JWT
core/guards/    bảo vệ route
state/          NgRx actions, reducers, effects, selectors
```

Component chỉ xử lý UI và dispatch action. Service chỉ gọi API. Effect xử lý side effect. Reducer cập nhật state bất biến.

## Chạy

```powershell
npm install
npm start
```

API mặc định là `http://localhost:5000`, được cấu hình trong `src/app/core/services/api.config.ts`.

Tài khoản demo nằm trong W5. Backend phải chạy trước, ví dụ:

```powershell
dotnet run --project w7/w7.csproj
```

Flow: login `POST /auth/login` → lưu JWT → interceptor gắn Bearer token → gọi `GET /api/performance/courses`.
