# Dokumentasi API

Dokumen ini menyediakan informasi tentang rute yang tersedia dalam API ini.

## Installation

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan project ini:

1.  **Clone repositori**

    Gunakan perintah berikut untuk meng-clone repositori ini:

    ```bash
    git clone <repository-url>

    ```

2.  **Instal dependensi**

    Arahkan ke direktori project dan instal dependensi yang diperlukan:

    ```bash

    cd <project-name>
    npm install

    ```

3.  **Siapkan database**

    Project ini menggunakan database PostgreSQL. Pastikan sudah menginstal dan menjalankan PostgreSQL di komputer/laptop. Buat database baru dan perbarui konfigurasi database di file **_.env_**.

4.  **Jalankan migrasi database**

    Jalankan perintah berikut untuk melakukan migrasi database:

    ```bash

        npx prisma generate
        npx prisma migrate dev

    ```

5.  **Start the server**

    Gunakan perintah berikut untuk memulai server:

    ```bash

        npm run start

    ```

    Server akan mulai berjalan di http://localhost:PORT

## User Routes

- **POST /users/register**: Register a new user. Middleware: `registerMiddleware`
- **POST /users/login**: Login a user. Middleware: `loginValidation`
- **GET /users/profile**: Get user profile. Middleware: `verifyToken`
- **PUT /users/profile/update**: Update user profile. Middleware: `verifyToken`, `updateMiddleware`
- **PUT /users/profile/image**: Update user profile image. Middleware: `verifyToken`, `upload.single("profile_image")`

## Transaction Routes

- **GET /transactions/balance**: Get user balance. Middleware: `verifyToken`
- **POST /transactions/topup**: Top up user balance. Middleware: `verifyToken`, `updateMiddleware`
- **POST /transactions/transaction**: Make a transaction. Middleware: `verifyToken`, `updateMiddleware`
- **GET /transactions/transaction/history**: Get transaction history. Middleware: `verifyToken`

## Information Routes

- **GET /information/banner**: Get all banners. Controller: `informationAllBanner`
- **GET /information/services**: Get all services. Controller: `informationServices`

## Error Handling

If an error occurs, the API will respond with a JSON object with the following structure:

```json
{
  "message": "Error message",
  "error": {
    "status": "Error status"
  }
}
```
