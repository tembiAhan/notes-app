# Notes App

Aplikasi RESTful API sederhana untuk mengelola catatan, dibangun menggunakan **Node.js**, **Express.js**, dan **PostgreSQL**.  
Proyek ini menampilkan operasi CRUD (Create, Read, Update, Delete) melalui endpoint HTTP dan menyimpan data catatan di database PostgreSQL.

---

## Deskripsi Singkat

Notes App adalah aplikasi backend yang digunakan untuk menyimpan, menampilkan, memperbarui, dan menghapus data catatan.  
Data disimpan secara persisten di database PostgreSQL dan dapat diakses menggunakan REST API.  
Proyek ini cocok sebagai latihan dasar pembuatan REST API dengan Express dan PostgreSQL.

---

## Fitur

- Menambahkan catatan baru  
- Melihat semua catatan atau berdasarkan ID  
- Memperbarui catatan berdasarkan ID  
- Menghapus catatan berdasarkan ID  
- Menggunakan Express middleware untuk parsing JSON, logging, dan error handling  
- Menyimpan data secara permanen di database PostgreSQL  

---

## Teknologi yang Digunakan

| Teknologi | Keterangan |
|------------|------------|
| **Node.js** | Menjalankan JavaScript di sisi server |
| **Express.js** | Framework untuk membuat REST API |
| **PostgreSQL** | Database relasional untuk penyimpanan catatan |
| **pg (node-postgres)** | Library untuk koneksi Node.js ke PostgreSQL |
| **dotenv** | Mengelola variabel lingkungan (environment variables) |
| **Nodemon** | (Opsional) Untuk pengembangan dengan auto reload |

---

## Instalasi dan Konfigurasi

### 1. Clone repository
```bash
git clone https://github.com/tembiAhan/notes-app.git
cd notes-app
```
### 2. Install dependensi
```bash
npm install
```
### 3. Konfigurasi environment
Buat file .env di root proyek dan isi seperti contoh berikut:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=<your_username>
DB_PASSWORD=<your_password>
DB_NAME=<your_database>
```
### 4. Membuat table database
```bash
npm run migrate up
```
### 5. Menjalankan server
```bash
npm run start
```
server akan berjalan pada http://localhost:3000

---

## Endpoint API
| Method     | Endpoint     | Keterangan                         |
| ---------- | ------------ | ---------------------------------- |
| **GET**    | `/notes`     | Mengambil semua catatan            |
| **GET**    | `/notes/:id` | Mengambil catatan berdasarkan ID   |
| **POST**   | `/notes`     | Menambahkan catatan baru           |
| **PUT**    | `/notes/:id` | Memperbarui catatan berdasarkan ID |
| **DELETE** | `/notes/:id` | Menghapus catatan berdasarkan ID   |

### Contoh Request POST /notes
```json
{
  "title": "Belajar Express dan PostgreSQL",
  "body": "Hari ini saya belajar membuat REST API menggunakan Express dan PostgreSQL."
}
```
### Contoh Response
```json
{
  "status": "success",
  "message": "Catatan berhasil ditambahkan",
  "data": {
    "id": 1,
    "title": "Belajar Express dan PostgreSQL",
    "body": "Hari ini saya belajar membuat REST API menggunakan Express dan PostgreSQL.",
    "created_at": "2025-10-28T14:32:10.000Z"
  }
}
```

---

## Pengujian API
Gunakan Postman atau Thunder Client untuk menguji setiap endpoint:
<ul>
<li>GET /notes</li>
<li>GET /notes/:id</li>
<li>POST /notes</li>
<li>PUT /notes/:id</li>
<li>DELETE /notes/:id</li>
</ul>

---

## Kontribusi
Kontribusi sangat terbuka.
1. Fork repository ini.
2. Buat branch baru (feature/nama-fitur).
3. Commit perubahan Anda.
4. Kirim pull request
