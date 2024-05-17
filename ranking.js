var map = L.map("map").setView([-8.65, 116.324], 10); // Set initial view to Lombok

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var markers = []; // Array untuk menyimpan semua marker

var dataWisata = [
  { nama: "Selong Belanak", C1: 4, C2: 4, C3: 4, C4: 5, C5: 5, C6: 3, koordinat: [-8.8695529, 116.1066307] },
  { nama: "Pantai Kuta", C1: 4, C2: 3, C3: 3, C4: 5, C5: 4, C6: 3, koordinat: [-8.8947086, 116.2625705] },
  { nama: "Bukit Merese", C1: 5, C2: 4, C3: 3, C4: 3, C5: 5, C6: 4, koordinat: [-8.9139246, 116.3164314] },
  { nama: "Pantai Smeti", C1: 5, C2: 5, C3: 2, C4: 3, C5: 4, C6: 2, koordinat: [-8.8914988, 116.15623] },
  { nama: "Pantai Tanjung Aan", C1: 4, C2: 3, C3: 4, C4: 3, C5: 4, C6: 4, koordinat: [-8.9100996, 116.318597] },
  { nama: "Desa Sade", C1: 5, C2: 4, C3: 4, C4: 1, C5: 3, C6: 4, koordinat: [-8.8393029, 116.2894122] },
  { nama: "Pantai Mawun", C1: 5, C2: 5, C3: 5, C4: 3, C5: 5, C6: 4, koordinat: [-8.9021342, 116.2241617] },
  { nama: "Pantai Mawi", C1: 4, C2: 3, C3: 2, C4: 5, C5: 5, C6: 3, koordinat: [-8.883289, 116.1393636] },
];

var bobot = [0.2, 0.2, 0.2, 0.1, 0.2, 0.1];

function tampilkanHasil() {
  // Mendapatkan nilai preferensi dari setiap kriteria
  var keindahan = parseInt(document.getElementById("inputKeindahan").value);
  var kebersihan = parseInt(document.getElementById("inputKebersihan").value);
  var fasilitas = parseInt(document.getElementById("inputFasilitas").value);
  var costBudget = parseInt(document.getElementById("inputCostBudget").value);
  var costJarak = parseInt(document.getElementById("inputCostJarak").value);
  var keamanan = parseInt(document.getElementById("inputKeamanan").value);

  // Data dummy profil pengguna
  var profilPengguna = {
    keindahan: keindahan,
    kebersihan: kebersihan,
    fasilitas: fasilitas,
    costBudget: costBudget,
    costJarak: costJarak,
    keamanan: keamanan,
  };

  // Menghitung nilai Profile Matching
  var profileMatching = [];
  dataWisata.forEach(function (wisata) {
    var totalMatching = 0;
    totalMatching += Math.abs(wisata.C1 - profilPengguna.keindahan);
    totalMatching += Math.abs(wisata.C2 - profilPengguna.kebersihan);
    totalMatching += Math.abs(wisata.C3 - profilPengguna.fasilitas);
    totalMatching += Math.abs(wisata.C4 - profilPengguna.costBudget);
    totalMatching += Math.abs(wisata.C5 - profilPengguna.costJarak);
    totalMatching += Math.abs(wisata.C6 - profilPengguna.keamanan);
    profileMatching.push({ nama: wisata.nama, nilai: totalMatching, koordinat: wisata.koordinat });
  });

  // Menghitung nilai SAW
  var SAW = [];
  dataWisata.forEach(function (wisata) {
    var totalSAW = wisata.C1 * bobot[0] + wisata.C2 * bobot[1] + wisata.C3 * bobot[2] + wisata.C4 * bobot[3] + wisata.C5 * bobot[4] + wisata.C6 * bobot[5];
    SAW.push({ nama: wisata.nama, nilai: totalSAW, koordinat: wisata.koordinat });
  });

  var hasilGabungan = [];
  for (var i = 0; i < dataWisata.length; i++) {
    var namaWisata = dataWisata[i].nama;
    var nilaiProfileMatching = profileMatching[i].nilai;
    var nilaiSAW = SAW[i].nilai;
    var nilaiGabungan = (nilaiProfileMatching + nilaiSAW) / 2;
    hasilGabungan.push({ nama: namaWisata, nilai: nilaiGabungan, koordinat: dataWisata[i].koordinat });
  }

  // Mengurutkan hasil gabungan dari yang terkecil ke terbesar
  hasilGabungan.sort(function (a, b) {
    return a.nilai - b.nilai;
  });

  // Menampilkan hasil rekomendasi gabungan (hanya satu tempat wisata)
  var hasilOutput = "<p><strong>Tempat Wisata yang Cocok Untukmu:</strong></p>";
  hasilOutput += "<p>" + hasilGabungan[0].nama + " ✨</p>"; // Menampilkan tempat wisata pertama dengan emoticon

  // Menampilkan hasil di HTML
  document.getElementById("hasilGabungan").innerHTML = hasilOutput;

  // Menghapus semua marker sebelumnya dari peta
  markers.forEach(function (marker) {
    map.removeLayer(marker);
  });
  markers = [];

  // Menampilkan lokasi pada peta
  var koordinat = hasilGabungan[0].koordinat;
  var marker = L.marker(koordinat).addTo(map).bindPopup(`<b>${hasilGabungan[0].nama}</b>`).openPopup();
  markers.push(marker);
}
