# Week 6 — Docker, Compose và CI/CD

Thư mục này chứa lớp triển khai cho API `w5`. Source code vẫn nằm ở `../w5`; Dockerfile dùng multi-stage build để đóng gói API thành image runtime gọn hơn.

## Chạy bằng Docker Compose

Từ thư mục `trainning_dev`:

```powershell
docker compose -f w6/docker-compose.yml up --build
```

API chạy tại:

```text
http://localhost:5000
http://localhost:5000/swagger
```

Dừng container:

```powershell
docker compose -f w6/docker-compose.yml down
```

## Chạy riêng image

```powershell
docker build -f w6/Dockerfile -t w5-api .
docker run --rm -p 5000:8080 w5-api
```

## Kiểm tra nhanh

```powershell
curl http://localhost:5000/
```

## Nguyên tắc clean code

- `w5`: source code và nghiệp vụ API.
- `w6`: cấu hình đóng gói, chạy container và CI/CD.
- Dockerfile dùng multi-stage build.
- `.dockerignore` loại bỏ `bin`, `obj`, `.git` và file tạm.
- Secret thật không commit; giá trị trong Compose chỉ phục vụ demo.
