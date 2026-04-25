from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Cấu hình CORS để mọi trình duyệt có thể gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model dữ liệu cho người dùng
class User(BaseModel):
    email: str
    password: str

USERS_FILE = "users.json" # Tên file lưu tài khoản

# Hàm đọc danh sách tài khoản từ file
def load_users():
    try:
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

# Hàm lưu danh sách tài khoản vào file
def save_users(users):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=4)

# Endpoint Đăng ký
@app.post("/register")
def register_user(user: User):
    users = load_users()
    # Kiểm tra nếu email đã tồn tại
    if any(u["email"] == user.email for u in users):
        return {"status": "error", "message": "Email này đã được sử dụng!"}
    
    users.append(user.dict()) # Thêm user mới vào mảng
    save_users(users) # Lưu lại vào file json
    return {"status": "success"}

# Endpoint Đăng nhập
@app.post("/login")
def login_user(user: User):
    users = load_users()
    # Kiểm tra email và mật khẩu có khớp không
    for u in users:
        if u["email"] == user.email and u["password"] == user.password:
            username = user.email.split('@')[0] # Lấy tên trước dấu @ làm nickname
            return {"status": "success", "username": username}
            
    return {"status": "error", "message": "Sai Email hoặc Mật khẩu!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)