// Data dummy tempat wisata beserta nilai kriteria
var dataWisata = [
  { nama: "Selong Belanak", C1: 4, C2: 4, C3: 4, C4: 5, C5: 5, C6: 3 },
  { nama: "Pantai Kuta", C1: 4, C2: 3, C3: 3, C4: 5, C5: 4, C6: 3 },
  { nama: "Bukit Merese", C1: 5, C2: 4, C3: 3, C4: 3, C5: 5, C6: 4 },
  { nama: "Pantai Smeti", C1: 5, C2: 5, C3: 2, C4: 3, C5: 4, C6: 2 },
  { nama: "Pantai Tanjung Aan", C1: 4, C2: 3, C3: 4, C4: 3, C5: 4, C6: 4 },
  { nama: "Desa Sade", C1: 5, C2: 4, C3: 4, C4: 1, C5: 3, C6: 4 },
  { nama: "Pantai Mawun", C1: 5, C2: 5, C3: 5, C4: 3, C5: 5, C6: 4 },
  { nama: "Pantai Mawi", C1: 4, C2: 3, C3: 2, C4: 5, C5: 5, C6: 3 },
];

// Bobot untuk setiap kriteria
var bobot = [0.2, 0.15, 0.2, 0.2, 0.1, 0.15];

// Fungsi untuk menampilkan hasil
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
    profileMatching.push({ nama: wisata.nama, nilai: totalMatching });
  });

  // Menghitung nilai SAW
  var SAW = [];
  dataWisata.forEach(function (wisata) {
    var totalSAW = wisata.C1 * bobot[0] + wisata.C2 * bobot[1] + wisata.C3 * bobot[2] + wisata.C4 * bobot[3] + wisata.C5 * bobot[4] + wisata.C6 * bobot[5];
    SAW.push({ nama: wisata.nama, nilai: totalSAW });
  });

  // Menggabungkan hasil Profile Matching dan SAW
  var hasilGabungan = [];
  for (var i = 0; i < dataWisata.length; i++) {
    var namaWisata = dataWisata[i].nama;
    var nilaiProfileMatching = profileMatching[i].nilai;
    var nilaiSAW = SAW[i].nilai;
    var nilaiGabungan = (nilaiProfileMatching + nilaiSAW) / 2;
    hasilGabungan.push({ nama: namaWisata, nilai: nilaiGabungan });
  }

  // Mengurutkan hasil gabungan dari yang terkecil ke terbesar
  hasilGabungan.sort(function (a, b) {
    return a.nilai - b.nilai;
  });

  // Menampilkan hasil rekomendasi gabungan
  var hasilOutput = "<p><strong>Tempat Wisata yang Cocok Untukmu:</strong></p>";
  hasilOutput += "<ol>";
  for (var j = 0; j < 2; j++) {
    hasilOutput += "<li>" + hasilGabungan[j].nama + "</li>";
  }
  hasilOutput += "</ol>";

  // Menampilkan hasil di HTML
  document.getElementById("hasilGabungan").innerHTML = hasilOutput;
}
