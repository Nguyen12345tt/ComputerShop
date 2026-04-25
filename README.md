# 💻 TechGear PC - Website Thương Mại Điện Tử Bán Máy Tính

TechGear PC là một hệ thống website thương mại điện tử chuyên cung cấp các thiết bị máy tính, PC Gaming, và PC Văn phòng. Dự án được xây dựng theo mô hình Full-Stack với giao diện người dùng hiện đại và hệ thống Backend xử lý API độc lập.

## 🚀 Các tính năng nổi bật

### Dành cho Khách hàng (Frontend - Khách)
* **Giao diện hiện đại, Responsive:** Tối ưu hóa hiển thị trên cả máy tính và thiết bị di động với Tailwind CSS.
* **Hiển thị & Phân trang:** Trình bày sản phẩm dưới dạng Grid, tự động phân trang (6 sản phẩm/trang) giúp tối ưu tốc độ tải.
* **Tìm kiếm thông minh (Live Search):** Lọc sản phẩm theo tên theo thời gian thực (gõ tới đâu tìm tới đó).
* **Quản lý Giỏ hàng:** Thêm, xóa sản phẩm, tự động tính tổng tiền. Hiệu ứng Toast notification (chữ V xanh, X đỏ) cực mượt.
* **Thanh toán (Checkout):** * Form điền thông tin chi tiết (Họ tên, SĐT, Địa chỉ).
  * Hỗ trợ thanh toán COD và Chuyển khoản (Tự động hiện mã QR Code ngân hàng).
  * Tích hợp mã giảm giá (Voucher).
  * Đồng bộ dữ liệu đơn hàng tự động lên **Google Sheets**.
* **Hệ thống Tài khoản:** Đăng ký, Đăng nhập kết nối trực tiếp với Backend REST API. Có lưu phiên đăng nhập cục bộ.


## 🛠️ Công nghệ sử dụng

* **Frontend:** HTML5, JavaScript (Vanilla), Tailwind CSS (qua CDN), FontAwesome.
* **Backend:** Python, FastAPI, Uvicorn, Pydantic.
* **Cơ sở dữ liệu:** * Lưu trữ cấu trúc JSON cục bộ (`users.json`, `database.json`).
  * Google Sheets API (Google Apps Script) cho quản lý đơn hàng.
* **Deploy/Hosting:** GitHub Pages (Frontend), Render (Backend).

## 📁 Cấu trúc thư mục

```text
ComputerShop/
│
├── index.html            # Trang chủ dành cho Khách hàng
├── README.md             # Tài liệu mô tả dự án
│
├── js/                   # Thư mục chứa logic Frontend
│   ├── index.js          # Logic cho trang chủ (Giỏ hàng, Phân trang, Auth...)
│
└── backend/              # Thư mục mã nguồn Server Python
    ├── main.py           # File chạy chính của FastAPI
    ├── users.json        # File lưu trữ dữ liệu Tài khoản
    └── requirements.txt  # Danh sách thư viện Python cần thiết
