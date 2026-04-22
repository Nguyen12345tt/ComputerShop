const API_URL = "https://computershop-i88k.onrender.com/products";
const modal = document.getElementById('productModal');

// Bật/Tắt Hộp thoại
function openModal() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputImage').value = '';
    document.getElementById('inputCpu').selectedIndex = 0;
    document.getElementById('inputRam').selectedIndex = 0;
    document.getElementById('inputStorage').selectedIndex = 0;
    document.getElementById('inputPrice').value = '';
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

// Đổ dữ liệu từ Server ra Bảng
async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();
        const tbody = document.getElementById('adminProductTable');
        tbody.innerHTML = ''; 

        products.forEach(pc => {
            const priceVND = new Intl.NumberFormat('vi-VN').format(pc.price) + ' đ';
            // Nếu không nhập link ảnh, tự động hiển thị ảnh mặc định
            const imgToDisplay = pc.imageUrl ? pc.imageUrl : 'https://via.placeholder.com/60x60?text=PC';

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 flex items-center gap-3">
                        <img src="${imgToDisplay}" class="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm" alt="PC">
                        <span class="font-semibold text-gray-800">${pc.name}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                        <b>CPU:</b> ${pc.cpu} <br> 
                        <b>RAM:</b> ${pc.ram} <br>
                        <b>Ổ cứng:</b> ${pc.storage || 'Không có'}
                    </td>
                    <td class="px-6 py-4 text-red-600 font-bold">${priceVND}</td>
                    <td class="px-6 py-4">
                        <button onclick="deleteProduct('${pc.name}')" class="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded hover:bg-red-100 transition"><i class="fa-solid fa-trash"></i> Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Lỗi mạng:", error);
        document.getElementById('adminProductTable').innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Không thể kết nối đến máy chủ!</td></tr>`;
    }
}

// Gửi lệnh Thêm PC lên Server
async function saveProduct() {
    const newPc = {
        name: document.getElementById('inputName').value,
        imageUrl: document.getElementById('inputImage').value,
        cpu: document.getElementById('inputCpu').value,
        ram: document.getElementById('inputRam').value,
        storage: document.getElementById('inputStorage').value,
        price: parseInt(document.getElementById('inputPrice').value)
    };

    if(!newPc.name || !newPc.price) {
        alert("Vui lòng nhập Tên và Giá!");
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPc)
    });
    
    closeModal(); 
    loadProducts(); // Cập nhật lại giao diện sau khi thêm
}

// Gửi lệnh Xóa lên Server
async function deleteProduct(pcName) {
    if(confirm(`Bạn có chắc chắn muốn xóa "${pcName}"?`)) {
        await fetch(`${API_URL}/${pcName}`, { method: 'DELETE' });
        loadProducts(); // Cập nhật lại giao diện sau khi xóa
    }
}

// Tự động tải bảng
loadProducts();