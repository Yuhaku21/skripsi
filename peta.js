const map = L.map("map").setView([-8.681478, 115.939379], 10);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Lokasi titik koordinat tempat wisata
const marker1 = L.marker([-8.8914988, 116.15623]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/X6sEe9UJ6XH9EQsS9">Pantai Nambung</a></b>`).openPopup();
const marker2 = L.marker([-8.8695529, 116.1066307]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/gAxUM3JtGU9gQwj86">Selong Belanak</a></b>`).openPopup();
const marker3 = L.marker([-8.8393029, 116.2894122]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/ENhvF2yHPvaqVktH6">Desa Sade</a></b>`).openPopup();
const marker4 = L.marker([-8.9139246, 116.3164314]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/MFLrrSH2mUdn2jSS7">Bukit Merese</a></b>`).openPopup();
const marker5 = L.marker([-8.8947086, 116.2625705]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/PGGpzYV3BcVRwEuZ9">Pantai Kuta</a></b>`).openPopup();
const marker6 = L.marker([-8.883289, 116.1393636]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/DAPoU5XcSNKRBdRZ6">Pantai Mawi</a></b>`).openPopup();
const marker7 = L.marker([-8.9100996, 116.318597]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/HoiYUuepid4ZUnTq7">Tanjung Aan</a></b>`).openPopup();
const marker8 = L.marker([-8.9021342, 116.2241617]).addTo(map).bindPopup(`<b><a href="https://maps.app.goo.gl/oM27T83WcL57Vmvx7">Pantai Mawun</a></b>`).openPopup();

// Lokasi titik koordinat tempat wisata
function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent(`You clicked the map at ${e.latlng.toString()}`).openOn(map);
}

map.on("click", onMapClick);
