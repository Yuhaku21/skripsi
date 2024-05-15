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

function tampilkanHasil() {
  // Menghitung nilai R untuk setiap kriteria
  var R = [];
  dataWisata.forEach(function (wisata) {
    var R1 =
      wisata.C1 /
      Math.max.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C1;
        })
      );
    var R2 =
      wisata.C2 /
      Math.max.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C2;
        })
      );
    var R3 =
      wisata.C3 /
      Math.max.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C3;
        })
      );
    var R4 =
      Math.min.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C4;
        })
      ) / wisata.C4;
    var R5 =
      Math.min.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C5;
        })
      ) / wisata.C5;
    var R6 =
      wisata.C6 /
      Math.max.apply(
        Math,
        dataWisata.map(function (w) {
          return w.C6;
        })
      );

    // Menghitung nilai total dengan bobot terponderasi
    var total = R1 * bobot[0] + R2 * bobot[1] + R3 * bobot[2] + R4 * bobot[3] + R5 * bobot[4] + R6 * bobot[5];

    R.push({ nama: wisata.nama, nilai: total });
  });

  // Mengurutkan nilai total dari yang tertinggi ke terendah
  R.sort(function (a, b) {
    return b.nilai - a.nilai;
  });

  // Menampilkan hasil rekomendasi untuk setiap tempat wisata
  R.forEach(function (hasil) {
    console.log("Nama Tempat Wisata:", hasil.nama);
    console.log("Nilai Total:", hasil.nilai.toFixed(2));
    console.log(); // Garis kosong untuk pemisah antar tempat wisata
  });
}

// Memanggil fungsi untuk menampilkan hasil
tampilkanHasil();
