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

// Hàm tải dữ liệu (Sửa nút xóa để nó truyền ID thay vì truyền Tên)
async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();
        const tbody = document.getElementById('adminProductTable');
        tbody.innerHTML = ''; 

        products.forEach(pc => {
            const priceVND = new Intl.NumberFormat('vi-VN').format(pc.price) + ' đ';
            const imgToDisplay = pc.imageUrl ? pc.imageUrl : 'https://via.placeholder.com/60x60?text=PC';
            
            // Xử lý chống lỗi cho các PC cũ chưa có ID
            const pcId = pc.id || "Cũ";

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 flex items-center gap-3">
                        <img src="${imgToDisplay}" class="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm" alt="PC">
                        <div>
                            <span class="font-semibold text-gray-800 block">${pc.name}</span>
                            <span class="text-xs font-mono text-blue-500 bg-blue-50 px-2 py-1 rounded">Mã: ${pcId}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                        <b>CPU:</b> ${pc.cpu} <br> 
                        <b>RAM:</b> ${pc.ram} <br>
                        <b>Ổ cứng:</b> ${pc.storage || 'Không có'}
                    </td>
                    <td class="px-6 py-4 text-red-600 font-bold">${priceVND}</td>
                    <td class="px-6 py-4">
                        <button onclick="deleteProduct('${pcId}', '${pc.name}')" class="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded hover:bg-red-100 transition"><i class="fa-solid fa-trash"></i> Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        document.getElementById('adminProductTable').innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Không thể kết nối máy chủ!</td></tr>`;
    }
}

// Gửi lệnh Thêm PC lên Server
async function saveProduct() {
    const nameVal = document.getElementById('inputName').value;
    const priceVal = parseInt(document.getElementById('inputPrice').value);

    if(!nameVal || isNaN(priceVal)) {
        alert("⚠️ Vui lòng nhập Tên và Giá!");
        return;
    }

    // Tự động tạo mã PC gồm chữ "PC" + 6 số ngẫu nhiên (VD: PC854923)
    const randomID = "PC" + Math.floor(100000 + Math.random() * 900000);

    // Tạo đối tượng PC mới với ID tự động
    const newPc = {
        id: randomID, // Bơm cái ID vào đây!
        name: nameVal, // Lấy tên từ input
        imageUrl: document.getElementById('inputImage').value, // Lấy link ảnh từ input
        cpu: document.getElementById('inputCpu').value, // Lấy CPU từ input
        ram: document.getElementById('inputRam').value, // Lấy RAM từ input
        storage: document.getElementById('inputStorage').value, // Lấy Storage từ input
        price: priceVal
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPc)
        });

        if(response.ok) {
            closeModal(); 
            loadProducts(); 
        } else {
            alert("❌ Server báo lỗi: " + await response.text());
        }
    } catch (error) {
        alert("⏳ Lỗi kết nối đến Server!");
    }
}

// Gửi lệnh Xóa lên Server
async function deleteProduct(pcId, pcName) {
    if(pcId === "Cũ") {
        alert("Sản phẩm này được tạo từ phiên bản cũ (chưa có Mã). Vui lòng xóa trắng file Database để làm lại!");
        return;
    }

    if(confirm(`Xóa sản phẩm "${pcName}" (Mã: ${pcId}) khỏi cửa hàng?`)) {
        try {
            // URL bây giờ gọi bằng ID cực kỳ an toàn, không lo dấu cách hay ký tự lạ
            const response = await fetch(`${API_URL}/${pcId}`, { method: 'DELETE' });
            
            if(response.ok) {
                loadProducts(); 
            }
        } catch (error) {
            alert("⏳ Lỗi kết nối!");
        }
    }
}

// Tự động tải bảng
loadProducts();