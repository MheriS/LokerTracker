# Loker Tracker

**Loker Tracker** adalah aplikasi manajemen lamaran kerja berbasis web yang dirancang untuk membantu *job seeker* memantau, mengelola, dan menganalisis status lamaran kerja secara efisien dan *real-time*.

Aplikasi ini menggantikan metode pencatatan manual (Excel/buku tulis) dengan antarmuka modern yang intuitif, memungkinkan pengguna untuk fokus pada persiapan karier daripada administrasi data.

## 🚀 Fitur Utama

- **Dashboard Statistik**: Ringkasan visual jumlah lamaran berdasarkan status (Applied, Interview, Offer, Rejected).
- **Real-time Sync**: Integrasi **Firebase Firestore** memastikan data tersimpan aman di cloud dan tersinkronisasi antar perangkat secara instan.
- **Manajemen Status**: Ubah status lamaran dengan mudah (mis: dari *Applied* ke *Interview*).
- **Pencarian & Filter**: Temukan riwayat lamaran spesifik berdasarkan nama perusahaan atau posisi dengan cepat.
- **Responsif**: Tampilan optimal di Desktop maupun Mobile.

## 🛠️ Teknologi

Project ini dibangun menggunakan *tech stack* modern untuk performa dan pengalaman pengembang (DX) terbaik:

- **Frontend**: [Vue.js 3](https://vuejs.org/) (Composition API & Script Setup)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Modern CSS (Glassmorphism design)
- **Database**: [Google Firebase Firestore](https://firebase.google.com/)

## 📦 Cara Menjalankan (Local Development)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/MheriS/LokerTracker.git
    cd LokerTracker
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Firebase**
    - Buat file `src/firebase.js` berdasarkan panduan di Firebase Console.
    - Pastikan memiliki `apiKey`, `authDomain`, dan `projectId` yang valid.

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```

## 📝 Lisensi

[MIT](https://opensource.org/licenses/MIT)
