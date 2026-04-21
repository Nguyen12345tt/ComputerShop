const API_URL = 'http://localhost:5167/api/products'; // Sửa lại Port cho đúng

// ==========================================
// 1. CHỨC NĂNG TẢI & HIỂN THỊ DANH SÁCH PC
// ==========================================
const tableBody = document.getElementById('adminProductTable');

// Chỉ chạy hàm này nếu đang ở file index.html (nơi có cái bảng)
if (tableBody) {
    loadProducts();
}

async function loadProducts() {
    try {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Đang tải dữ liệu...</td></tr>';
        
        const response = await fetch(API_URL);
        const products = await response.json();
        
        tableBody.innerHTML = ''; // Xóa chữ đang tải

        products.forEach(pc => {
            const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pc.price);
            
            tableBody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium">#${pc.id}</td>
                    <td class="px-6 py-4">
                        <span class="font-bold block">${pc.name}</span>
                        <span class="text-xs text-gray-500">CPU: ${pc.cpu} | RAM: ${pc.ram}</span>
                    </td>
                    <td class="px-6 py-4 text-red-600 font-semibold">${priceFormatted}</td>
                    <td class="px-6 py-4">
                        <button class="text-blue-500 hover:text-blue-700 mr-3"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="deletePC(${pc.id})" class="text-red-500 hover:text-red-700">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Lỗi:", error);
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-red-500">Lỗi không lấy được dữ liệu</td></tr>';
    }
}

// ==========================================
// 2. CHỨC NĂNG XÓA PC (CÓ HỎI XÁC NHẬN)
// ==========================================
async function deletePC(id) {
    // Hiển thị hộp thoại hỏi xác nhận
    const isConfirm = confirm(`⚠️ Bạn có chắc chắn muốn xóa PC mã #${id} không?\nHành động này không thể hoàn tác!`);
    
    if (isConfirm) {
        try {
            // Gửi lệnh DELETE xuống C#
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Đã xóa thành công!');
                loadProducts(); // Tải lại bảng ngay lập tức để ẩn dòng vừa xóa
            } else {
                alert('Có lỗi xảy ra khi xóa!');
            }
        } catch (error) {
            alert('Không thể kết nối tới server!');
        }
    }
}

// ==========================================
// 3. CHỨC NĂNG THÊM MỚI PC
// ==========================================
const addForm = document.getElementById('addPcForm');

// Chỉ gắn sự kiện Submit nếu đang ở file create.html (nơi có Form)
if (addForm) {
    addForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const newProduct = {
            name: document.getElementById('addName').value,
            cpu: document.getElementById('addCpu').value,
            ram: document.getElementById('addRam').value,
            price: parseFloat(document.getElementById('addPrice').value),
            warranty: document.getElementById('addWarranty').value,
            imageUrl: "https://via.placeholder.com/150", 
            vga: "Đang cập nhật" 
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                alert('Thêm PC thành công!');
                window.location.href = 'index.html'; // Tự động đá về trang danh sách
            }
        } catch (error) {
            alert('Lỗi kết nối tới C#');
        }
    });
}