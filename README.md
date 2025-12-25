# Ứng dụng Kết nối Việc làm & Lao động Phổ thông (Worker App)

Dự án xây dựng nền tảng kết nối "Cực nhanh - Cực đơn giản" giữa Người cần việc và Người cần thợ.

---

## 1. Tổng quan & Chiến lược

### 1.1 Mục tiêu cốt lõi
- **Giai đoạn 1 (Tăng trưởng):** Miễn phí hoàn toàn. Kết nối trực tiếp qua Gọi điện/Zalo để tạo thói quen và tích lũy dữ liệu.
- **Giai đoạn 2 (Kiếm soát & Doanh thu):** Chuyển sang mô hình Web Portal quản lý chặt chẽ, ẩn thông tin liên lạc và thu phí.

### 1.2 Phạm vi sản phẩm (Giai đoạn 1)
- **Mobile App (All-in-one):** Worker Mode & User Mode.
- **Web Admin (Lite):** Duyệt hồ sơ và quản lý câu hỏi.

---

## 2. Hệ thống thiết kế (Design System)

### 2.1 Typography (Phông chữ)
- **Primary Font:** `Be Vietnam Pro` (Google Fonts) - Hỗ trợ tiếng Việt hoàn hảo.
- **Scale:**
  - **Heading 1:** 24px (Bold) - Tên dịch vụ chính.
  - **Heading 2:** 20px (SemiBold) - Tên thợ/Tiêu đề phụ.
  - **Body:** 16px (Regular) - Nội dung chính (Kích thước tối thiểu cho người lớn tuổi).
  - **Caption:** 14px (Medium) - Chú thích phụ.

### 2.2 Color Palette (Bảng màu)
- **Primary (Chủ đạo):** `#0068FF` (Xanh Zalo) - Tin cậy & Quen thuộc.
- **Secondary (Hành động):** `#FF6600` (Cam) - Dành cho nút "Gọi ngay", "Cần gấp".
- **Semantic:**
  - **Success:** `#00C853` (Xanh lá) - Đang rảnh / Đã xác thực.
  - **Error:** `#D50000` (Đỏ) - Lỗi / Cảnh báo.
- **Surface:** `#F5F5F5` (Xám nhạt) - Làm nổi bật các thẻ (Card) trắng.

### 2.3 Iconography (Biểu tượng)
- **Library:** `Lucide React Native`.
- **Style:** Stroke width = 2.
- **Quy tắc:** Icon dịch vụ cần có background shape màu nhẹ để dễ phân biệt.

---

## 3. Chân dung người dùng

- **Người lao động (Worker):** Thợ điện nước, giúp việc, thợ xây, sinh viên... Cần việc ngay, ngại thao tác phức tạp.
- **Người tuyển dụng (User/Employer):** Hộ gia đình, chủ cửa hàng. Cần tìm thợ gấp ở gần.

---

## 4. Chức năng chính (Giai đoạn 1)

### 4.1 Dành cho Người lao động (Worker)
- **Đăng ký:** Số điện thoại + OTP.
- **Sàng lọc (Visual Quiz):** Trắc nghiệm hình ảnh để tự động gắn nhãn kỹ năng.
- **Trust Score:** Chấm điểm dựa trên độ đầy đủ của hồ sơ.
- **Trạng thái:** Nút gạt "Đang rảnh" / "Đang bận".

### 4.2 Dành cho Người tuyển dụng (User)
- **Tìm quanh đây:** Bản đồ/Danh sách thợ gần nhất theo ngành nghề.
- **Kết nối:** Gọi điện, Zalo, hoặc Chat nội bộ.

---

## 5. Hướng dẫn kỹ thuật

### Khởi chạy
```bash
npm install
npx expo start
```

### Công nghệ
- **UI:** Custom Theme (Colors & Typography)
- **Icons:** `lucide-react-native`
- **Fonts:** `Be Vietnam Pro` (loaded via `expo-font`)
