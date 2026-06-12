CREATE DATABASE IF NOT EXISTS batdongsan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE batdongsan;

-- Bảng người dùng (Admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng dự án nổi bật
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    main_img VARCHAR(512),
    side_img VARCHAR(512),
    badge VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng bất động sản / tin đăng
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100),
    location VARCHAR(255),
    beds INT,
    baths INT,
    area DOUBLE,
    img VARCHAR(512),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng yêu cầu tư vấn / liên hệ
CREATE TABLE IF NOT EXISTS consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- DỮ LIỆU MẪU (SEED DATA)
-- --------------------------------------------------------

-- Thêm tài khoản admin mặc định: 
-- username: admin
-- password: admin123 (đã được mã hóa bằng thuật toán bcrypt)
INSERT IGNORE INTO users (username, password_hash) 
VALUES ('admin', '$2a$10$XwQy9/6E2Y5.gU8J2U.WlOWz2/3yv7Nl2s8A9R3/o3.R5/5c7pDk6');

-- Thêm dữ liệu dự án mẫu
INSERT INTO projects (title, description, main_img, side_img, badge) VALUES
('Rivea Hanoi', 'Tọa lạc tại Phường Vĩnh Hưng, quận Hoàng Mai, Hà Nội. Dự án sở hữu quy mô 29.853 m2 với pháp lý hợp đồng mua bán hoàn thiện cùng mức giá vô cùng hấp dẫn từ 3-8 Tỷ.', 'https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg', 'https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg', 'SẮP MỞ BÁN'),
('Vinhomes Nguyễn Trãi (Cao Xà Lá)', 'Tọa lạc tại địa chỉ đắc địa 233 – 233B – 235 Nguyễn Trãi, quận Thanh Xuân, Hà Nội. Dự án có quy mô 109.98 m2, pháp lý sổ đỏ lâu dài.', 'https://xemnha.vn/uploads/upload-images/images/Vinhomes-Cao-Xa-La.jpg', 'https://xemnha.vn/uploads/upload-images/images/phoi-canh-masteri-cao-xa-la-3.png', 'ĐANG XÂY DỰNG');
