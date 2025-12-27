# Cập nhật Logic Dual-Role System

## Tổng quan thay đổi

Đã thay đổi logic ứng dụng từ hệ thống vai trò đơn (customer hoặc worker) sang hệ thống vai trò kép (dual-role):
- **Mọi tài khoản đều là khách hàng (mặc định)**
- **Có thể đăng ký thêm làm thợ** (cần xác thực căn cước)
- **Nếu đã là thợ**: Có thể bật/tắt chế độ hoạt động

## Các file đã thay đổi

### 1. `context/AuthContext.tsx`
**Thay đổi chính:**
- Thay đổi từ `role: 'customer' | 'worker' | null` sang `UserData` object
- Thêm các trường:
  - `isLoggedIn: boolean` - Đã đăng nhập chưa
  - `isWorker: boolean` - Đã đăng ký làm thợ chưa
  - `isWorkerActive: boolean` - Chế độ thợ có đang hoạt động không

**Các function mới:**
- `registerAsWorker()` - Đăng ký làm thợ (sau khi xác thực căn cước)
- `toggleWorkerActive()` - Bật/tắt chế độ hoạt động của thợ

### 2. `app/index.tsx` (Màn hình chọn vai trò)
**Thay đổi:**
- Thay đổi từ "Bạn là ai?" sang "Bắt đầu sử dụng"
- Chỉ còn 1 nút đăng nhập chính (tất cả đều bắt đầu như khách hàng)
- Thêm phần thông tin về việc trở thành thợ (không phải nút riêng)
- Giải thích rằng sau khi đăng nhập, có thể đăng ký làm thợ trong app

### 3. `app/(tabs)/index.tsx` (Màn hình chính)
**Thêm mới:**
- Import `useAuth` hook
- Thêm UI toggle "Chế độ làm việc" ngay dưới phần "Xin chào"
- Toggle chỉ hiển thị khi `user.isWorker === true`
- Hiển thị trạng thái:
  - 🟢 Đang hoạt động - Khách hàng có thể tìm thấy bạn
  - ⚪ Không hoạt động - Bạn đang ẩn khỏi tìm kiếm
- Sử dụng `Switch` component để bật/tắt

### 4. `app/(tabs)/profile.tsx` (Màn hình profile)
**Thay đổi:**
- Cập nhật header để hiển thị:
  - "Khách hàng" nếu chưa đăng ký làm thợ
  - "Khách hàng & Thợ" nếu đã đăng ký làm thợ
  - Hiển thị trạng thái hoạt động (Đang hoạt động/Không hoạt động) nếu là thợ

**Thêm mới:**
- Card "Trở thành thợ" (CTA) hiển thị khi `!user.isWorker`
- Card này dẫn đến `/worker-auth/register`
- Thiết kế nổi bật với border vàng, shadow, và icon

### 5. `app/worker-auth/register.tsx` (MỚI)
**Màn hình đăng ký làm thợ với 3 bước:**

**Bước 1 - Intro:**
- Giới thiệu lợi ích khi trở thành thợ:
  - 💰 Thu nhập ổn định
  - ⏰ Linh hoạt thời gian
  - 🛡️ Bảo vệ uy tín
- Hiển thị yêu cầu:
  - Căn cước công dân còn hiệu lực
  - Độ tuổi từ 18 trở lên
  - Có kỹ năng/kinh nghiệm

**Bước 2 - KYC (Know Your Customer):**
- Upload ảnh mặt trước căn cước
- Upload ảnh mặt sau căn cước
- Upload ảnh chân dung cầm căn cước
- Nút "Xác thực ngay"

**Bước 3 - Success:**
- Thông báo đăng ký thành công
- Hướng dẫn bật chế độ "Hoạt động" ở màn hình chính
- Nút "Hoàn tất" để quay về profile

## Flow hoạt động

### Flow đăng nhập lần đầu:
1. User mở app → Màn hình chọn vai trò
2. User nhấn "Đăng nhập / Đăng ký"
3. `signIn()` được gọi → `isLoggedIn = true, isWorker = false`
4. Redirect đến `/(tabs)` (màn hình chính)

### Flow đăng ký làm thợ:
1. User vào Profile
2. Thấy card "Trở thành thợ" (nếu chưa là thợ)
3. Nhấn vào card → `/worker-auth/register`
4. Xem thông tin lợi ích và yêu cầu
5. Nhấn "Bắt đầu đăng ký"
6. Upload ảnh căn cước (3 ảnh)
7. Nhấn "Xác thực ngay"
8. `registerAsWorker()` được gọi → `isWorker = true, isWorkerActive = false`
9. Màn hình thành công
10. Nhấn "Hoàn tất" → Quay về Profile

### Flow bật/tắt chế độ thợ:
1. User đã là thợ (`isWorker = true`)
2. Ở màn hình chính, thấy toggle "Chế độ làm việc"
3. Bật/tắt switch
4. `toggleWorkerActive()` được gọi
5. Trạng thái cập nhật ngay lập tức
6. Khi bật: Khách hàng có thể tìm thấy thợ này
7. Khi tắt: Thợ ẩn khỏi kết quả tìm kiếm

## Lưu trữ dữ liệu

**AsyncStorage key:** `user_data`

**Cấu trúc dữ liệu:**
```json
{
  "isLoggedIn": true,
  "isWorker": true,
  "isWorkerActive": false
}
```

## Ưu điểm của hệ thống mới

1. **Linh hoạt hơn**: User không phải chọn vai trò cứng nhắc
2. **Trải nghiệm tốt hơn**: Mọi người đều bắt đầu như khách hàng, có thể nâng cấp lên thợ
3. **Kiểm soát tốt hơn**: Thợ có thể tắt chế độ hoạt động khi bận
4. **Bảo mật hơn**: Yêu cầu xác thực căn cước để trở thành thợ
5. **Rõ ràng hơn**: UI hiển thị rõ trạng thái và vai trò của user

## Các bước tiếp theo (đề xuất)

1. **Tích hợp API xác thực căn cước thật**
2. **Thêm màn hình chọn kỹ năng/lĩnh vực** cho thợ
3. **Cập nhật logic tìm kiếm** để chỉ hiển thị thợ đang active
4. **Thêm thông báo** khi có khách hàng tìm thợ gần đó
5. **Dashboard cho thợ** để xem thống kê công việc
