# Notes App – RESTful API

Aplikasi RESTful API untuk mengelola **catatan**, **pengguna**, **autentikasi**, dan **kolaborasi**, dibangun menggunakan **Node.js**, **Express.js**, dan **PostgreSQL**.  
Struktur aplikasi dibuat modular agar lebih mudah dipelihara, scalable, dan siap untuk environment development maupun production.

---

## Fitur Utama

### Notes
- CRUD catatan (create, read, update, delete)
- Validasi input menggunakan middleware
- Mendukung kolaborasi antar pengguna

### Users
- Registrasi pengguna
- Mendapatkan detail informasi user

### Authentication
- Login dengan JWT
- Akses token & refresh token
- Token refresh endpoint
- Logout (menghapus refresh token)

### Collaborations
- Menambahkan kolaborator pada catatan
- Menghapus kolaborator
- Hanya user yang memiliki akses yang dapat melihat atau mengubah note

### Sistem
- Middleware error handler yang terpusat
- Response API terstruktur
- Modularisasi service, controller, and routes
- Koneksi database menggunakan Pool PostgreSQL
- Environment variables dengan `.env`

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|----------|----------|
| **Node.js** | Runtime server |
| **Express.js** | Framework backend |
| **PostgreSQL** | Database relasional |
| **pg** | PostgreSQL client |
| **jsonwebtoken** | JWT token |
| **bcrypt** | Hashing password |
| **Joi** | Validasi request |
| **dotenv** | Environment variables |

---

## Instalasi

### 1. Clone repository
```bash
git clone https://github.com/tembiAhan/notes-app.git
cd notes-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Konfigurasi Environment Variables
Buat file .env di root:
<-- server configuration !-->
HOST=localhost
PORT=5000

<-- PostgreSQL !-->
PGUSER=youruserdatabase
PGHOST=localhost
PGPASSWORD=yourpassword
PGDATABASE=notes_app
PGPORT=5432

<-- JWT !-->
ACCESS_TOKEN_KEY=youraccesstokenkey
REFRESH_TOKEN_KEY=yourrefreshtokenkey

---

## Menjalankan Aplikasi
### Development:
```bash
npm run dev
```
### Production:
```bash
npm start
```
Server berjalan di:
```arduino
http://localhost:5000
```

## Daftar Endpoint
### Authentication
| Method | Endpoint         | Deskripsi     |
| ------ | ---------------- | ------------- |
| POST   | /authentications | Login         |
| PUT    | /authentications | Refresh token |
| DELETE | /authentications | Logout        |

### Users
| Method | Endpoint   | Deskripsi       |
| ------ | ---------- | --------------- |
| POST   | /users     | Registrasi user |
| GET    | /users/:id | Detail user     |

### Notes
| Method | Endpoint   | Deskripsi                |
| ------ | ---------- | ------------------------ |
| GET    | /notes     | Ambil semua catatan user |
| POST   | /notes     | Tambah catatan           |
| GET    | /notes/:id | Ambil catatan            |
| PUT    | /notes/:id | Update catatan           |
| DELETE | /notes/:id | Hapus catatan            |

### Collaborations
| Method | Endpoint        | Deskripsi          |
| ------ | --------------- | ------------------ |
| POST   | /collaborations | Tambah kolaborator |
| DELETE | /collaborations | Hapus kolaborator  |

## Pengujian API

Gunakan Postman / Thunder Client / Insomnia.

## Kontribusi

Fork repo

Buat branch baru

Commit perubahan

Kirim pull request
