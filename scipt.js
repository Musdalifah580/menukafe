/* ==========================================================================
   1. DATA UTAMA APLIKASI (STATE & MENU DATA)
   ========================================================================== */

// Database menu kafe (Dapat dihubungkan ke backend API / Firebase nantinya)
const menuData = [
    { 
        id: 1, 
        name: "Es Kopi Susu Aren", 
        category: "kopi", 
        price: 22000, 
        desc: "Espresso, susu segar, dan gula aren murni", 
        isAvailable: true, 
        img: "☕" 
    },
    { 
        id: 2, 
        name: "Americano Cold", 
        category: "kopi", 
        price: 18000, 
        desc: "Double shot espresso dengan es segar", 
        isAvailable: true, 
        img: "🥤" 
    },
    { 
        id: 3, 
        name: "Matcha Latte", 
        category: "non-kopi", 
        price: 24000, 
        desc: "Matcha Uji Jepang murni dengan susu segar", 
        isAvailable: true, 
        img: "🍵" 
    },
    { 
        id: 4, 
        name: "Croissant Cokelat", 
        category: "snack", 
        price: 20000, 
        desc: "Pastry renyah dengan isian cokelat lumer", 
        isAvailable: false, // Contoh produk habis
        img: "🥐" 
    },
    { 
        id: 5, 
        name: "Nasi Goreng Spesial", 
        category: "makanan", 
        price: 32000, 
        desc: "Nasi goreng ayam, telur mata sapi, dan kerupuk", 
        isAvailable: true, 
        img: "🍳" 
    },
    { 
        id: 6, 
        name: "French Fries", 
        category: "snack", 
        price: 15000, 
        desc: "Kentang goreng renyah dengan bumbu gurih", 
        isAvailable: true, 
        img: "🍟" 
    }
];

// State aplikasi (penyimpanan sementara selama halaman aktif)
let cartState = {};        // Format: { idProduk: jumlahPesanan }
let currentCategory = 'semua';
let splitPeopleCount = 2; // Default patungan untuk 2 orang

/* ==========================================================================
   2. RENDERING DAN TAMPILAN MENU (VIEW)
   ========================================================================== */

/**
 * Menampilkan daftar menu ke dalam grid HTML berdasarkan filter kategori dan pencarian.
 */
function renderMenu() {
    const gridContainer = document.getElementById('menuGrid');
    const searchKeyword = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // Kosongkan grid sebelum mengisi data baru
    gridContainer.innerHTML = '';

    // Filter menu berdasarkan kategori aktif dan kata kunci pencarian
    const filteredMenu = menuData.filter(item => {
        const matchesCategory = currentCategory === 'semua' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchKeyword) || 
                              item.desc.toLowerCase().includes(searchKeyword);
        return matchesCategory && matchesSearch;
    });

    // Tampilkan pesan jika menu tidak ditemukan
    if (filteredMenu.length === 0) {
        gridContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 32px 0; font-size: 13px;">
                Menu tidak ditemukan.
            </div>`;
        return;
    }

    // Render setiap item menu ke HTML
    filteredMenu.forEach(item => {
        const qty = cartState[item.id] || 0;
        
        const cardElement = document.createElement('div');
        cardElement.className = `menu-card ${!item.isAvailable ? 'sold-out' : ''}`;
        
        cardElement.innerHTML = `
            <div class="menu-icon">${item.img}</div>
            <div class="menu-details">
                <div class="menu-header">
                    <h3 class="menu-title">${item.name}</h3>${!item.isAvailable ? '<span class="badge-sold-out">Habis</span>' : ''}
                </div>
                <p class
