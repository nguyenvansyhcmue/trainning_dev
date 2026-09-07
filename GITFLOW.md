# Git Flow Guideline

Tài liệu này mô tả quy trình sử dụng Git và GitHub trong project `w1Api`.

## 1. Mục đích

Git dùng để:

- Lưu lịch sử thay đổi của source code.
- Biết ai đã sửa file nào.
- Khôi phục lại phiên bản cũ.
- Làm việc theo branch.
- Review code trước khi đưa vào branch chính.

GitHub dùng để:

- Lưu repository trên Internet.
- Làm việc nhóm.
- Tạo Pull Request.
- Review và quản lý source code.

## 2. Các branch chính

### `main`

Branch `main` chứa code ổn định.

Không nên viết code trực tiếp trên `main`.

### `feature/*`

Branch dùng để phát triển một tính năng hoặc một công việc riêng.

Ví dụ:

```text
feature/week-1-setup
feature/add-course-api
feature/add-database
```

Với project hiện tại, branch đang sử dụng là:

```text
w1-setup
```

Tên này vẫn hoạt động, nhưng quy ước rõ nghĩa hơn là:

```text
feature/week-1-setup
```

## 3. Quy trình làm việc chuẩn

```text
main
  ↓
Tạo feature branch
  ↓
Viết code
  ↓
Kiểm tra code
  ↓
Commit
  ↓
Push lên GitHub
  ↓
Tạo Pull Request
  ↓
Code Review
  ↓
Sửa góp ý
  ↓
Merge vào main
```

## 4. Khởi tạo Git repository

Nếu project chưa có Git:

```powershell
git init
```

Kiểm tra:

```powershell
git status
```

Đổi tên branch chính thành `main`:

```powershell
git branch -M main
```

## 5. Tạo branch làm việc

Tạo branch mới:

```powershell
git switch -c feature/week-1-setup
```

Kiểm tra branch hiện tại:

```powershell
git branch
```

Branch đang sử dụng sẽ có dấu `*`.

Ví dụ:

```text
* feature/week-1-setup
  main
```

## 6. Làm việc trên feature branch

Trong feature branch, em thực hiện:

- Viết code.
- Tạo hoặc sửa file.
- Chạy ứng dụng.
- Kiểm tra lỗi.
- Kiểm tra format.

Các lệnh kiểm tra:

```powershell
dotnet build
dotnet format --verify-no-changes
git diff --check
```

## 7. Kiểm tra file thay đổi

Xem trạng thái project:

```powershell
git status
```

Xem nội dung code đã thay đổi:

```powershell
git diff
```

Không nên commit các thư mục:

```text
bin/
obj/
.vs/
```

Các thư mục này cần được khai báo trong `.gitignore`.

## 8. Đưa file vào vùng chuẩn bị commit

Đưa tất cả file thay đổi vào staging:

```powershell
git add .
```

Hoặc chỉ thêm một file:

```powershell
git add Program.cs
```

Kiểm tra các file chuẩn bị commit:

```powershell
git diff --cached --stat
```

Xem chi tiết:

```powershell
git diff --cached
```

Nếu phát hiện file không muốn commit, bỏ file đó khỏi staging:

```powershell
git restore --staged ten-file
```

## 9. Commit

Commit dùng để lưu một mốc thay đổi vào Git local.

Cấu trúc commit message:

```text
type: description
```

Các type thường dùng:

```text
feat      Thêm tính năng
fix       Sửa lỗi
docs      Thêm hoặc sửa tài liệu
chore     Cấu hình hoặc công việc phụ trợ
refactor  Tổ chức lại code
test      Thêm hoặc sửa test
```

Ví dụ:

```powershell
git commit -m "chore: setup ASP.NET Core 8 project"
git commit -m "feat: add course endpoint"
git commit -m "docs: add coding standard"
git commit -m "fix: correct course route"
```

Commit message nên:

- Viết ngắn gọn.
- Nói rõ thay đổi.
- Dùng động từ phù hợp.
- Không viết kiểu `update`, `fix`, `code mới`.

Không nên:

```text
git commit -m "sửa code"
git commit -m "update"
git commit -m "abc"
```

## 10. Đẩy branch lên GitHub

Lần đầu push branch:

```powershell
git push -u origin feature/week-1-setup
```

Tham số `-u` thiết lập upstream giữa branch local và branch GitHub.

Các lần sau chỉ cần:

```powershell
git push
```

Kiểm tra branch đã liên kết chưa:

```powershell
git status -sb
```

Ví dụ:

```text
## feature/week-1-setup...origin/feature/week-1-setup
```

Nếu thấy:

```text
[ahead 1]
```

nghĩa là local có commit chưa push. Chạy:

```powershell
git push
```

## 11. Pull Request

Pull Request, viết tắt là PR, là yêu cầu đưa code từ feature branch vào `main`.

Tạo PR bằng GitHub CLI:

```powershell
gh pr create --base main --head feature/week-1-setup --fill
```

Hoặc mở giao diện trên trình duyệt:

```powershell
gh pr create --web
```

Nội dung PR nên có:

```markdown
## Changes

- Setup ASP.NET Core 8 project
- Add first GET endpoint
- Add .editorconfig
- Add Coding Standard
- Add Git Flow guideline

## Verification

- dotnet build
- dotnet format --verify-no-changes
- git diff --check
- Test GET /
```

## 12. Code Review

Trước khi merge, reviewer kiểm tra:

```text
[ ] Code có chạy được không?
[ ] Có lỗi build không?
[ ] Tên class, method và biến có rõ nghĩa không?
[ ] Hàm có quá dài không?
[ ] Lambda có đang chứa logic phức tạp không?
[ ] Có code thừa không?
[ ] Có commit bin/ hoặc obj/ không?
[ ] Có mật khẩu hoặc token không?
[ ] Có test API không?
[ ] Commit message có rõ nghĩa không?
```

Ví dụ nhận xét tích cực:

```text
Tên method GetCourseById rõ nghĩa.
Program.cs đang ngắn và dễ đọc.
Code đã có kiểm tra id không hợp lệ.
```

Ví dụ góp ý:

```text
Method này đang làm nhiều việc.
Nên tách phần xử lý dữ liệu sang method riêng.
Tên biến data chưa thể hiện rõ dữ liệu gì.
```

Reviewer không nên chỉ nói:

```text
Code xấu.
Sửa lại đi.
```

Góp ý cần cụ thể và có hướng cải thiện.

## 13. Sửa code sau khi review

Sau khi reviewer góp ý:

```powershell
git add .
git commit -m "fix: address code review comments"
git push
```

Pull Request sẽ tự cập nhật commit mới.

Kiểm tra PR:

```powershell
gh pr view --web
```

## 14. Merge Pull Request

Sau khi review xong:

```powershell
gh pr merge --squash --delete-branch
```

Ý nghĩa:

```text
--squash              Gộp các commit thành một commit
--delete-branch      Xóa feature branch sau khi merge
```

Có thể merge bằng giao diện GitHub bằng nút:

```text
Merge pull request
```

## 15. Cập nhật branch main local

Sau khi merge Pull Request:

```powershell
git switch main
git pull --ff-only origin main
```

Kiểm tra:

```powershell
git status
```

Kết quả mong muốn:

```text
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

## 16. Xóa branch local

Nếu feature branch đã merge xong:

```powershell
git branch -d feature/week-1-setup
```

Xem các branch còn lại:

```powershell
git branch
```

## 17. Quy trình hằng ngày

Mỗi lần bắt đầu làm việc:

```powershell
git switch main
git pull --ff-only origin main
git switch -c feature/ten-tinh-nang
```

Sau khi hoàn thành code:

```powershell
dotnet build
dotnet format --verify-no-changes
git diff --check
git status
git add .
git commit -m "feat: describe the feature"
git push -u origin feature/ten-tinh-nang
```

Sau đó tạo Pull Request.

## 18. Các lệnh Git quan trọng

```powershell
git status
git status -sb
git branch
git branch --show-current
git switch main
git switch -c feature/example
git add .
git commit -m "message"
git push
git pull --ff-only
git log --oneline
git diff
git diff --cached
git remote -v
```

## 19. Nguyên tắc cần nhớ

- Không code trực tiếp trên `main`.
- Mỗi tính năng nên có một feature branch.
- Commit nhỏ và có ý nghĩa.
- Kiểm tra code trước khi commit.
- Không commit `bin/`, `obj/` và file bí mật.
- Pull Request phải được review trước khi merge.
- Không xóa branch khi chưa chắc chắn branch đã merge.
- Không dùng Git command nguy hiểm nếu chưa hiểu rõ.