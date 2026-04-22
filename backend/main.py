from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Cấu hình CORS để Frontend từ github.io có thể gọi được vào Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model dữ liệu cho PC
class Product(BaseModel):
    id: str = ""  # ID sẽ được tạo tự động khi thêm sản phẩm
    name: str
    price: int
    cpu: str
    ram: str
    storage: str
    image_url: str = ""

# Database tạm thời (Sẽ lưu vào file JSON cho đơn giản)
DB_FILE = "database.json"

def load_db():
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

@app.get("/products")
def get_products():
    return load_db()

@app.post("/products")
def add_product(product: Product):
    db = load_db()
    db.append(product.dict())
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=4)
    return {"status": "success"}

@app.delete("/products/{product_id}")
def delete_product(product_id: str):
    db = load_db() # Tải dữ liệu từ file database.json
    db = [pc for pc in db if pc.get('id') != product_id] # Lọc và giữ lại những PC có id KHÁC với id cần xóa
    
    with open(DB_FILE, "w", encoding="utf-8") as f: # Mở file database để ghi đè
        json.dump(db, f, ensure_ascii=False, indent=4) # Lưu mảng mới (đã xóa PC) vào file JSON
    return {"status": "success"} # Trả về thông báo thành công cho Frontend

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)