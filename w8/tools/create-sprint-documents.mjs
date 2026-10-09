import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun
} from 'docx';

const outputDirectory = path.resolve(import.meta.dirname, '..', '..', 'báo cáo', 'tài liệu');

const sections = {
  planning: {
    fileName: 'Sprint Planning W8.docx',
    title: 'SPRINT PLANNING — W8',
    content: [
      ['heading', '1. Thông tin sprint'],
      ['paragraph', 'Sprint: W8'],
      ['paragraph', 'Thời lượng dự kiến: 1 tuần'],
      ['paragraph', 'Sản phẩm: W8 Angular Client — hệ thống quản trị sinh viên'],
      ['heading', '2. Sprint Goal'],
      ['paragraph', 'Hoàn thiện frontend Angular nâng cao cho hệ thống quản trị sinh viên, có đăng nhập JWT, phân quyền admin, quản lý state bằng NgRx, hiển thị danh sách sinh viên và nhập điểm trên giao diện.'],
      ['heading', '3. Phạm vi công việc'],
      ['bullet', 'Xây dựng Angular Standalone Components và lazy routes.'],
      ['bullet', 'Tạo form đăng nhập bằng Reactive Forms.'],
      ['bullet', 'Tích hợp AuthService, JWT, Auth Guard và Admin Guard.'],
      ['bullet', 'Tạo HTTP Interceptor để gắn JWT vào request.'],
      ['bullet', 'Quản lý Auth, Students và Grades bằng NgRx.'],
      ['bullet', 'Đọc danh sách sinh viên từ students.json.'],
      ['bullet', 'Chuyển dữ liệu Excel thành JSON và hỗ trợ watch file.'],
      ['bullet', 'Tạo modal nhập điểm bằng Reactive Form.'],
      ['bullet', 'Tính điểm tổng kết theo công thức 10% — 30% — 60%.'],
      ['bullet', 'Hiển thị điểm tổng kết trở lại trên bảng sinh viên.'],
      ['bullet', 'Thêm logout và thời hạn session mô phỏng 1 phút.'],
      ['heading', '4. User Stories'],
      ['paragraph', 'US01 — Với vai trò admin, tôi muốn đăng nhập để truy cập khu vực quản trị sinh viên.'],
      ['paragraph', 'US02 — Với vai trò admin, tôi muốn xem danh sách sinh viên để quản lý dữ liệu học tập.'],
      ['paragraph', 'US03 — Với vai trò admin, tôi muốn nhập điểm chuyên cần, giữa kỳ và cuối kỳ cho sinh viên.'],
      ['paragraph', 'US04 — Với vai trò admin, tôi muốn thấy điểm tổng kết được tính tự động trên bảng.'],
      ['paragraph', 'US05 — Với vai trò người dùng đã đăng nhập, tôi muốn đăng xuất để kết thúc phiên làm việc.'],
      ['heading', '5. Acceptance Criteria'],
      ['bullet', 'Admin đăng nhập thành công được chuyển tới trang students.'],
      ['bullet', 'Người chưa đăng nhập không truy cập được students và grades.'],
      ['bullet', 'User không có role admin không truy cập được khu vực quản trị.'],
      ['bullet', 'Danh sách sinh viên được hiển thị từ students.json.'],
      ['bullet', 'Modal nhập điểm có validation cho dữ liệu bắt buộc và khoảng điểm.'],
      ['bullet', 'Điểm tổng kết được tính theo 0.1 × chuyên cần + 0.3 × giữa kỳ + 0.6 × cuối kỳ.'],
      ['bullet', 'Logout xóa token và chuyển về login.'],
      ['heading', '6. Kiến trúc dự kiến'],
      ['paragraph', 'Component → NgRx Action → Effect → Service → Success/Failure Action → Reducer → Selector → Template.'],
      ['paragraph', 'Component chỉ xử lý giao diện và event; service xử lý HTTP hoặc persistence; effect xử lý side effect; reducer chỉ cập nhật state.'],
      ['heading', '7. Definition of Done'],
      ['bullet', 'Code build được và không còn lỗi template/TypeScript.'],
      ['bullet', 'Tên biến, hàm và file thể hiện đúng trách nhiệm.'],
      ['bullet', 'Không tạo API giả hoặc báo cáo dữ liệu mô phỏng như database thật.'],
      ['bullet', 'Các luồng login, guard, hiển thị sinh viên, nhập điểm và logout được kiểm tra thủ công.'],
      ['bullet', 'Giao diện responsive và không phá vỡ dữ liệu hiện có.']
    ]
  },
  review: {
    fileName: 'Sprint Review W8.docx',
    title: 'SPRINT REVIEW — W8',
    content: [
      ['heading', '1. Thông tin sprint'],
      ['paragraph', 'Sprint: W8'],
      ['paragraph', 'Sản phẩm review: W8 Angular Client — hệ thống quản trị sinh viên'],
      ['heading', '2. Sprint Goal đã đạt được'],
      ['paragraph', 'Đã xây dựng được frontend Angular có authentication, authorization, NgRx state management, danh sách sinh viên và luồng nhập điểm trên giao diện.'],
      ['heading', '3. Chức năng đã hoàn thành'],
      ['bullet', 'Angular Standalone Components và lazy loading routes.'],
      ['bullet', 'Login bằng AuthService và JWT response.'],
      ['bullet', 'Auth Guard bảo vệ route yêu cầu đăng nhập.'],
      ['bullet', 'Admin Guard kiểm tra role admin.'],
      ['bullet', 'HTTP Interceptor tự động gắn Bearer token.'],
      ['bullet', 'NgRx Auth, Students và Grades gồm actions, reducers, effects và selectors.'],
      ['bullet', 'Đọc danh sách sinh viên từ src/assets/students.json.'],
      ['bullet', 'Tool import Excel thành JSON và watch file thay đổi.'],
      ['bullet', 'Modal nhập điểm không chuyển trang.'],
      ['bullet', 'Reactive Form có validation.'],
      ['bullet', 'Tính điểm tổng kết theo trọng số chuyên cần 10%, giữa kỳ 30%, cuối kỳ 60%.'],
      ['bullet', 'Điểm vừa nhập được cập nhật lên bảng sinh viên.'],
      ['bullet', 'Logout xóa thông tin xác thực và điều hướng về login.'],
      ['heading', '4. Luồng demo'],
      ['paragraph', 'Bước 1: Mở ứng dụng và đăng nhập bằng tài khoản admin.'],
      ['paragraph', 'Bước 2: Auth Guard và Admin Guard cho phép truy cập trang danh sách sinh viên.'],
      ['paragraph', 'Bước 3: StudentsEffect tải students.json và đưa dữ liệu vào NgRx store.'],
      ['paragraph', 'Bước 4: Bấm “Nhập điểm” để mở modal focus view.'],
      ['paragraph', 'Bước 5: Nhập mã sinh viên, môn học và ba loại điểm.'],
      ['paragraph', 'Bước 6: Lưu form; GradesEffect gọi GradeService và tính điểm tổng kết.'],
      ['paragraph', 'Bước 7: Điểm tổng kết hiển thị lại ở cột Điểm.'],
      ['paragraph', 'Bước 8: Mở menu tài khoản và chọn logout để quay về login.'],
      ['heading', '5. Công thức đã demo'],
      ['paragraph', 'Điểm tổng kết = Chuyên cần × 0.1 + Giữa kỳ × 0.3 + Cuối kỳ × 0.6.'],
      ['paragraph', 'Ví dụ: 10 × 0.1 + 8 × 0.3 + 8 × 0.6 = 8.2.'],
      ['heading', '6. Phần chưa hoàn thành'],
      ['bullet', 'GradeService hiện lưu bằng localStorage để mô phỏng persistence, chưa lưu database thật.'],
      ['bullet', 'Students đang đọc từ students.json, chưa lấy trực tiếp từ API backend.'],
      ['bullet', 'CQRS backend chưa được triển khai với Command Handler và Query Handler.'],
      ['bullet', 'Chưa phải kiến trúc Microservices hoàn chỉnh.'],
      ['bullet', 'Chưa có đầy đủ unit test cho guard, reducer, effect và công thức điểm.'],
      ['heading', '7. Feedback và bài học'],
      ['paragraph', 'NgRx phù hợp với dữ liệu có loading, success, error và được chia sẻ giữa nhiều component. Trạng thái UI cục bộ như modal mở/đóng nên giữ ở component, không đưa vào store.'],
      ['paragraph', 'Cần phân biệt rõ dữ liệu mô phỏng với dữ liệu production. localStorage chỉ phục vụ demo frontend, không thay thế backend persistence.'],
      ['paragraph', 'Việc chuẩn hóa encoding và format code cần thực hiện sớm để tránh lỗi hiển thị tiếng Việt và giảm chi phí bảo trì.'],
      ['heading', '8. Hướng sprint tiếp theo'],
      ['bullet', 'Kết nối GradeService với API backend thật.'],
      ['bullet', 'Lưu và cập nhật grade trong database.'],
      ['bullet', 'Xử lý tập trung lỗi HTTP 401, 403 và 500.'],
      ['bullet', 'Bổ sung unit test và integration test.'],
      ['bullet', 'Cân nhắc CQRS backend chỉ khi nhu cầu đọc/ghi và quy mô hệ thống thực sự cần.']
    ]
  }
};

function createParagraph(type, text) {
  if (type === 'heading') {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text, bold: true })]
    });
  }

  if (type === 'bullet') {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 70 },
      children: [new TextRun({ text })]
    });
  }

  return new Paragraph({
    spacing: { after: 120, line: 280 },
    children: [new TextRun({ text, size: 22 })]
  });
}

for (const section of Object.values(sections)) {
  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({ text: section.title, bold: true, size: 32 })]
    }),
    ...section.content.map(([type, text]) => createParagraph(type, text))
  ];

  const document = new Document({
    creator: 'W8 Angular Client',
    title: section.title,
    styles: {
      default: {
        document: { run: { font: 'Times New Roman', size: 22 } }
      }
    },
    sections: [{
      properties: {
        page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1200 } }
      },
      children
    }]
  });

  const outputPath = path.join(outputDirectory, section.fileName);
  fs.writeFileSync(outputPath, await Packer.toBuffer(document));
  console.log(`Created: ${outputPath}`);
}
