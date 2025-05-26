# @rangkotodotcom/simdapo

Library client untuk integrasi dengan SIMDAPO (Sistem Informasi Manajemen Data Pokok) berbasis Node.js dan TypeScript.

## 📦 Instalasi

```bash
npm install @rangkotodotcom/simdapo
```

## 🔐 Autentikasi Otomatis

Semua request akan mengelola akses token secara otomatis. Kamu hanya perlu menyediakan konfigurasi autentikasi:

```ts
import { request } from '@rangkotodotcom/simdapo';

const authConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
};

const result = await request({
  url: '/teacher',
  method: 'GET',
  authConfig,
});
```

## 📚 Contoh Penggunaan API

### ✅ Get Semua Guru

```ts
import { getTeacher } from '@rangkotodotcom/simdapo';

const auth = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
};

const teachers = await getTeacher(auth);
```

### ✅ Get Guru Berdasarkan ID

```ts
const teacher = await getTeacher(auth, '12345');
```

## 🧱 Struktur Folder

```
src/
├── apis/              # Fungsi wrapper untuk endpoint
│   └── getTeacher.ts
├── core/
│   ├── authManager.ts # Mengatur autentikasi dan token
│   ├── httpClient.ts  # Wrapper untuk axios
│   └── envConfig.ts   # Konfigurasi base URL dan auth URL
├── utils/
│   └── errorHandler.ts
```

## ⚙️ Build

Untuk membangun library (transpile TypeScript ke JavaScript):

```bash
npm run build
```

Output akan muncul di folder `dist/`.

## 🧪 Pengujian Lokal (Tanpa Publish)

Untuk menguji library ini secara lokal:

1. Build library:
   ```bash
   npm run build
   ```

2. Link secara global:
   ```bash
   npm link
   ```

3. Di project lain untuk testing:
   ```bash
   npm link @rangkotodotcom/simdapo
   ```

4. Untuk unlink:
   ```bash
   npm unlink @rangkotodotcom/simdapo
   # dan di folder library:
   npm unlink --no-save
   ```

## 🚀 Publish ke NPM

1. Login ke akun npm kamu:
   ```bash
   npm login
   ```

2. Pastikan `version` di `package.json` sudah di-update jika versi baru.

3. Publish ke registry:
   ```bash
   npm publish --access public
   ```

## 📋 Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [joi](https://www.npmjs.com/package/joi)
- TypeScript

## 📄 Lisensi

ISC License © [rangkotodotcom](https://www.npmjs.com/org/rangkotodotcom)
