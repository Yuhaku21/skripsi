// Definisi nama tempat wisata
const namaTempatWisata = {
  KW001: "Pantai Kuta",
  KW002: "Pantai Mawun",
};

// Definisi data untuk NCF dan NSF untuk setiap aspek
const harga_ncf = { KW001: 4, KW002: -1 };
const harga_nsf = { KW001: 4.25, KW002: 0.33 };

const fasilitas_ncf = { KW001: -0.33, KW002: 3.33 };
const fasilitas_nsf = { KW001: 0, KW002: 3 };

const jarak_ncf = { KW001: 2.16, KW002: 2.83 };
const jarak_nsf = { KW001: 3.75, KW002: 3.75 };

const rating_ncf = { KW001: 3.16, KW002: 3.66 };
const rating_nsf = { KW001: 4.25, KW002: 3.75 };

// Perhitungan nilai total untuk setiap aspek
const harga_total = {};
const fasilitas_total = {};
const jarak_total = {};
const rating_total = {};

for (const k in harga_ncf) {
  harga_total[k] = harga_ncf[k] * 0.6 + harga_nsf[k] * 0.4;
}

for (const k in fasilitas_ncf) {
  fasilitas_total[k] = fasilitas_ncf[k] * 0.6 + fasilitas_nsf[k] * 0.4;
}

for (const k in jarak_ncf) {
  jarak_total[k] = jarak_ncf[k] * 0.6 + jarak_nsf[k] * 0.4;
}

for (const k in rating_ncf) {
  rating_total[k] = rating_ncf[k] * 0.6 + rating_nsf[k] * 0.4;
}

// Perangkingan tempat wisata
const persentase_harga = 0.4;
const persentase_fasilitas = 0.4;
const persentase_jarak = 0.1;
const persentase_rating = 0.1;

const ranking = {};

for (const k in harga_total) {
  const total = persentase_harga * harga_total[k] + persentase_fasilitas * fasilitas_total[k] + persentase_jarak * jarak_total[k] + persentase_rating * rating_total[k];
  ranking[k] = total;
}

// Menampilkan hasil perangkingan
console.log("Hasil Perangkingan:");
console.log("Ranking\tKode Wisata\tNama Tempat Wisata\tHasil");
let sortedRanking = Object.entries(ranking).sort((a, b) => b[1] - a[1]);
let counter = 1;
sortedRanking.forEach(([k, v]) => {
  console.log(`${counter}\t${k}\t\t${namaTempatWisata[k]}\t${v.toFixed(2)}`);
  counter++;
});
