// --- CẤU HÌNH HỆ THỐNG ---
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpflaFvw7536vms9PBGCwoaXcjBP3SveAtFZE69-SBLGSd-PWDGf3MUCqMAddYB-aD/exec';

const pcs = [
    { id: 'pc1', name: 'PC Văn Phòng Basic', cpu: 'Core i3 12100', ram: '8GB DDR4', vga: 'Onboard', storage: '256GB SSD', price: 6500000, img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc2', name: 'PC Gaming Esport', cpu: 'Core i5 12400F', ram: '16GB DDR4', vga: 'GTX 1660 Super', storage: '512GB NVMe', price: 12500000, img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc3', name: 'PC Đồ Họa Creator', cpu: 'Ryzen 7 5700X', ram: '32GB DDR4', vga: 'RTX 3060 12GB', storage: '1TB NVMe', price: 21000000, img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc4', name: 'PC Gaming High-End', cpu: 'Core i7 13700K', ram: '32GB DDR5', vga: 'RTX 4070 Ti', storage: '1TB Gen4', price: 45000000, img: 'https://images.unsplash.com/photo-1605648916319-cf082f7524a1?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc5', name: 'PC Mini ITX Xinh xắn', cpu: 'Ryzen 5 7600', ram: '16GB DDR5', vga: 'RX 7600', storage: '512GB NVMe', price: 24500000, img: 'https://images.unsplash.com/photo-1555617782-b7e80a520eb0?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc6', name: 'PC Server Workstation', cpu: 'Dual Xeon E5', ram: '64GB ECC', vga: 'Quadro P2000', storage: '2TB SSD', price: 30000000, img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc7', name: 'PC Học Tập Giá Rẻ', cpu: 'Core i3 10105F', ram: '8GB DDR4', vga: 'GT 1030', storage: '256GB SSD', price: 5500000, img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc8', name: 'PC Gaming Tầm Trung', cpu: 'Ryzen 5 5600', ram: '16GB DDR4', vga: 'RTX 3050', storage: '500GB NVMe', price: 15500000, img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc9', name: 'PC Edit Video 4K', cpu: 'Core i5 13600K', ram: '32GB DDR5', vga: 'RTX 4060 Ti', storage: '1TB NVMe', price: 32000000, img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc10', name: 'PC Siêu Máy Tính', cpu: 'Core i9 14900K', ram: '64GB DDR5', vga: 'RTX 4090', storage: '2TB Gen4', price: 110000000, img: 'https://images.unsplash.com/photo-1605648916319-cf082f7524a1?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc11', name: 'PC APU Giải Trí', cpu: 'Ryzen 5 4600G', ram: '16GB DDR4', vga: 'Radeon Vega', storage: '512GB SSD', price: 7500000, img: 'https://images.unsplash.com/photo-1555617782-b7e80a520eb0?auto=format&fit=crop&w=400&q=80' },
    { id: 'pc12', name: 'PC Kiến Trúc Sư', cpu: 'Ryzen 9 7950X', ram: '64GB DDR5', vga: 'RTX 4080', storage: '2TB NVMe', price: 85000000, img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80' }
];

let cart = [];
let currentPage = 1;
const itemsPerPage = 6;

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// --- 1. VẼ GIAO DIỆN & PHÂN TRANG ---
function renderProducts(filterText = '') {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    const filtered = pcs.filter(pc => pc.name.toLowerCase().includes(filterText.toLowerCase()));
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pcsToShow = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    pcsToShow.forEach(pc => {
        grid.innerHTML += `
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
                <img src="${pc.img}" 
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80';" 
                alt="${pc.name}"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="p-6">
                    <h3 class="text-lg font-bold mb-3 text-gray-800 line-clamp-1">${pc.name}</h3>
                    <div class="text-sm text-gray-600 mb-5 space-y-2 bg-gray-50 p-3 rounded-lg font-mono">
                        <p>CPU: ${pc.cpu}</p>
                        <p>RAM: ${pc.ram}</p>
                        <p>SSD: ${pc.storage}</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-black text-red-600">${formatPrice(pc.price)}</span>
                        <div class="flex gap-2">
                            <button onclick="addToCart('${pc.id}')" class="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"><i class="fa-solid fa-cart-plus"></i></button>
                            <button onclick="buyNow('${pc.id}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-blue-700">Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-600';
        paginationEl.innerHTML += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-lg border ${activeClass}">${i}</button>`;
    }
}

function changePage(page) {
    currentPage = page;
    renderProducts(document.getElementById('searchInput').value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    currentPage = 1;
    renderProducts(e.target.value);
});

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('hidden');
    modal.style.display = modal.classList.contains('hidden') ? 'none' : 'flex';
}

// --- 2. HIỆU ỨNG TOAST ĐA NĂNG ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('customToast');
    const iconBg = document.getElementById('toastIconBg');
    const icon = document.getElementById('toastIcon');
    
    document.getElementById('toastMessage').innerText = message;
    
    // Reset màu và icon
    iconBg.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg';
    icon.className = 'fa-solid text-white text-3xl font-bold';
    
    // Tự động đổi màu và Icon theo trạng thái
    if (type === 'success') {
        iconBg.classList.add('bg-green-500', 'shadow-green-500/40');
        icon.classList.add('fa-check');
    } else if (type === 'error') {
        iconBg.classList.add('bg-red-500', 'shadow-red-500/40');
        icon.classList.add('fa-xmark');
    } else if (type === 'warning') {
        iconBg.classList.add('bg-yellow-500', 'shadow-yellow-500/40');
        icon.classList.add('fa-exclamation');
    }

    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'scale-50');
        toast.classList.add('opacity-100', 'scale-100');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'scale-100');
        toast.classList.add('opacity-0', 'scale-50');
        setTimeout(() => toast.classList.add('hidden'), 300); 
    }, 2000); // Để 2 giây cho khách kịp đọc chữ
}

function buyNow(pcId) {
    addToCart(pcId, false); 
    openCheckoutModal();
}

async function addToCart(pcId, showToastAlert = true) {
    const pc = pcs.find(p => p.id === pcId);
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    cart.push({ orderId, ...pc });
    updateCartUI(); 
    
    if (showToastAlert) {
        showToast('Đã thêm vào giỏ hàng!', 'success'); // Cập nhật gọi hàm mới
    }
    
    try {
        fetch(SCRIPT_URL, {
            method: 'POST', mode: 'no-cors',
            body: JSON.stringify({ action: 'add', id: orderId, pcName: pc.name, price: pc.price })
        });
    } catch (e) {}
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const container = document.getElementById('cartItems');
    let total = 0;
    container.innerHTML = cart.length === 0 ? '<p class="text-center mt-10 text-gray-400">Giỏ hàng trống</p>' : '';
    
    cart.forEach((item, idx) => {
        total += item.price;
        container.innerHTML += `
            <div class="bg-white p-4 rounded-lg border flex justify-between items-center shadow-sm">
                <div><h4 class="font-bold text-sm">${item.name}</h4><p class="text-red-500 font-bold">${formatPrice(item.price)}</p></div>
                <button onclick="removeFromCart('${item.orderId}')" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
    document.getElementById('cartTotal').innerText = formatPrice(total);
}

function removeFromCart(orderId) {
    cart = cart.filter(i => i.orderId !== orderId);
    updateCartUI();
}

// --- 3. ĐĂNG NHẬP / ĐĂNG KÝ (LIÊN KẾT SERVER) ---
function openAuthModal(mode) {
    const title = document.getElementById('authTitle');
    title.innerText = mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản';
    document.getElementById('authSwitchText').innerText = mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?';
    document.getElementById('authSwitchBtn').innerText = mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập';
    document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchAuth() {
    const isLogin = document.getElementById('authTitle').innerText === 'Đăng nhập';
    openAuthModal(isLogin ? 'register' : 'login');
}

async function submitAuth() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const isLogin = document.getElementById('authTitle').innerText === 'Đăng nhập';

    if (!email || !password) {
        showToast("Vui lòng điền đủ Email & Mật khẩu!", "warning"); // Thay alert
        return;
    }

    const btn = document.querySelector('#authModal button.bg-blue-600');
    const originalText = btn.innerText;
    btn.innerText = 'Đang xử lý...';
    btn.disabled = true;

    const authUrl = isLogin 
        ? 'https://computershop-i88k.onrender.com/login' 
        : 'https://computershop-i88k.onrender.com/register';

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });
        
        const data = await response.json();

        if (isLogin) {
            if (data.status === 'success') {
                closeAuthModal();
                showToast("Đăng nhập thành công!", "success"); // V xanh
                localStorage.setItem('techgear_currentUser', data.username);
                checkLoginState(); 
            } else {
                showToast(data.message, "error"); // X đỏ
            }
        } else {
            if (data.status === 'success') {
                showToast("Đăng ký thành công!", "success"); // V xanh
                switchAuth(); 
            } else {
                showToast(data.message, "error"); // X đỏ báo trùng email
            }
        }
    } catch (error) {
        showToast("Lỗi kết nối Máy chủ!", "error"); // Thay alert
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Cập nhật giao diện Header
function checkLoginState() {
    const user = localStorage.getItem('techgear_currentUser');
    const authDiv = document.getElementById('authButtons');
    
    if (user) {
        authDiv.innerHTML = `
            <span class="text-sm font-semibold text-blue-400">👋 Chào, ${user}</span>
            <button onclick="logout()" class="text-sm text-gray-400 hover:text-red-500 ml-3 transition" title="Đăng xuất"><i class="fa-solid fa-sign-out-alt text-lg"></i></button>
        `;
    } else {
        authDiv.innerHTML = `
            <button onclick="openAuthModal('login')" class="text-sm font-medium hover:text-blue-400 transition">Đăng nhập</button>
            <span class="text-gray-700">|</span>
            <button onclick="openAuthModal('register')" class="text-sm font-medium hover:text-blue-400 transition">Đăng ký</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('techgear_currentUser');
    checkLoginState();
    showToast("Đã đăng xuất!", "success"); // Cập nhật gọi hàm mới
}

// --- 4. LOGIC THANH TOÁN (CHECKOUT) ---
let currentDiscount = 0; 

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Giỏ hàng đang trống! Vui lòng chọn sản phẩm trước.", "warning");
        return;
    }
    
    document.getElementById('cartModal').classList.add('hidden'); 
    document.getElementById('checkoutModal').classList.remove('hidden'); 
    renderCheckoutItems(); 
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('paymentMethod').value = 'COD';
    document.getElementById('qrCodeContainer').classList.add('hidden');
}

function renderCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    let subtotal = 0;
    container.innerHTML = '';

    cart.forEach(item => {
        subtotal += item.price; 
        container.innerHTML += `
            <div class="flex justify-between items-center bg-white p-2 border-b border-gray-50 last:border-0">
                <div class="flex-1">
                    <h4 class="text-sm text-gray-800 line-clamp-1">${item.name}</h4>
                    <p class="text-xs text-gray-400 font-mono">${item.orderId}</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-bold text-gray-800 text-sm">${formatPrice(item.price)}</span>
                    <button onclick="removeCheckoutItem('${item.orderId}')" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    const total = subtotal - currentDiscount; 
    document.getElementById('checkoutSubtotal').innerText = formatPrice(subtotal);
    document.getElementById('checkoutTotal').innerText = formatPrice(total > 0 ? total : 0);
}

function toggleQRCode() {
    const method = document.getElementById('paymentMethod').value;
    const qrContainer = document.getElementById('qrCodeContainer');
    
    if (method === 'BANK') {
        qrContainer.classList.remove('hidden');
    } else {
        qrContainer.classList.add('hidden');
    }
}

function removeCheckoutItem(orderId) {
    removeFromCart(orderId); 
    renderCheckoutItems(); 
    
    if(cart.length === 0) {
        closeCheckoutModal(); 
    }
}

function applyVoucher() {
    const code = document.getElementById('voucherCode').value.toUpperCase();
    if (code === 'GIAM50') {
        currentDiscount = 50000; 
        document.getElementById('checkoutDiscount').innerText = "-" + formatPrice(currentDiscount);
        renderCheckoutItems(); 
        showSuccessToast("Áp dụng mã giảm giá thành công!"); // Đổi alert thành toast luôn cho sang
    } else {
        showSuccessToast("Mã giảm giá không hợp lệ hoặc đã hết hạn!"); // Sử dụng toast thay vì alert
    }
}

async function confirmOrder() {
    const name = document.getElementById('custName').value; 
    const phone = document.getElementById('custPhone').value; 
    const address = document.getElementById('custAddress').value; 

    if (!name || !phone || !address) {
        alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!");
        return;
    }

    alert(`Đang xử lý đơn hàng cho khách: ${name}...`);

    for (const item of cart) {
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST', mode: 'no-cors',
                body: JSON.stringify({ action: 'checkout', id: item.orderId })
            });
        } catch (err) {
            console.error(err);
        }
    }

    cart = []; 
    currentDiscount = 0; 
    document.getElementById('voucherCode').value = '';
    
    updateCartUI(); 
    closeCheckoutModal(); 
    
    document.getElementById('custName').value = '';
    document.getElementById('custPhone').value = '';
    document.getElementById('custEmail').value = '';
    document.getElementById('custAddress').value = '';

    showSuccessToast('🎉 ĐẶT HÀNG THÀNH CÔNG!'); // Báo thành công bằng toast
}

// KHỞI ĐỘNG
renderProducts();
checkLoginState(); // Bật kiểm tra trạng thái login ngay khi mở web