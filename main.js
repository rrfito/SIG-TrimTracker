// import { format } from "ol/coordinate";
// import "./style.css";
// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import VectorLayer from "ol/layer/Vector";
// import { Vector as VectorSource } from "ol/source";
// import OSM from "ol/source/OSM";
// import { fromLonLat } from "ol/proj";
// import GeoJSON from "ol/format/GeoJSON";
// import { Icon, Style } from "ol/style.js";
// import Overlay from "ol/Overlay.js";

// const container = document.getElementById("popup");
// const content_element = document.getElementById("popup-content");
// const closer = document.getElementById("popup-closer");
// // membuat overlay popup
// const overlay = new Overlay({
//   element: container,
//   autoPan: {
//     animation: {
//       duration: 250,
//     },
//   },
// });

// const barbershopLayer = new VectorLayer({
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: "data/titik_persebaran_barbershop.json", 
//   }),
//   style: new Style({
//     image: new Icon({
//       anchor: [0.5, 1],
//       anchorXUnits: "fraction",
//       anchorYUnits: "fraction",
//       src: "icon/barbershop.png", 
//       scale: 0.1, 
//     }),
//   }),
// });

// const kecPku = new VectorLayer({
//   background: "#1a2b39",
//   source: new VectorSource({
//     url: "data/map_pekanbaru.json",
//     format: new GeoJSON(),
//   }),
//   style: {
//     "fill-color": [
//       "interpolate",
//       ["linear"],
//       ["get", "FID"],
//       1,
//       "#ffff33",
//       100,
//       "#3358ff",
//     ],
//   },
// });

// const riau = new VectorLayer({
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: "data/polygon_riau.json",
//   }),
// });

// const map = new Map({
//   target: "map",
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//     kecPku,barbershopLayer


//   ],
//   overlays: [overlay],
//   view: new View({
//     center: fromLonLat([101.447777, 0.507068]),
//     zoom: 8,
//   }),
// });





// // Click handler to hide popup
// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };

// const popup = new Overlay({
//   element: document.getElementById("popup"),
//   positioning: "top-center",
//   stopEvent: false,
//   offset: [0, -15],
// });
// map.addOverlay(overlay);

// // Display popup on click
// map.on("singleclick", function (evt) {
//   const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
//   if (feature) {
//     const coordinate = evt.coordinate;
//     const content = `
//       <img src="data/image/${feature.get("Link Foto Drive")}" alt="Foto Barbershop" style="width: 200px; height: auto;">
//       <h3>${feature.get("Nama Salan / Barbershop")}</h3>
//       <p>Alamat: ${feature.get("Alamat")}</p>
//       <p>Kategori: ${feature.get("Kategori")}</p>
//       <p>Layanan: ${feature.get("Jenis Layanan")}</p>
//       <p>Kontak: ${feature.get("Kontak")}</p>
//       <p>Jam Operasional: ${feature.get("Jam Operasional")}</p>
//     `;
//     content_element.innerHTML = content;
//     overlay.setPosition(coordinate);
//   } else {
//     overlay.setPosition(undefined);
//   }
// });

// const featureOverlay = new VectorLayer({
//   source: new VectorSource(),
//   map: map,
//   style: {
//     "stroke-color": "rgba(255, 255, 255, 0.7)",
//     "stroke-width": 2,
//   },
// });

// let highlight;

// const highlightFeature = (pixel) => {
//   const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
//   if (feature !== highlight) {
//     if (highlight) {
//       featureOverlay.getSource().removeFeature(highlight);
//     }
//     if (feature) {
//       featureOverlay.getSource().addFeature(feature);
//     }
//     highlight = feature;
//   }
// };



// map.on("pointermove", (evt) => {
//   if (evt.dragging) {
//     popup.setPosition(undefined);
//     return;
//   }

//   const pixel = map.getEventPixel(evt.originalEvent);
//   highlightFeature(pixel);
//   displayFeatureInfo(pixel);
// });

// const polygonLayerCheckbox = document.getElementById("polygon");
// const pointLayerCheckbox = document.getElementById("point");

// polygonLayerCheckbox.addEventListener("change", () => {
//   kecPku.setVisible(polygonLayerCheckbox.checked);
// });

// pointLayerCheckbox.addEventListener("change", () => {
//   barbershopLayer.setVisible(pointLayerCheckbox.checked);
// });
















import { format } from "ol/coordinate";
import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Icon, Style } from "ol/style.js";
import Overlay from "ol/Overlay.js";

// Inisialisasi elemen untuk popup
const container = document.getElementById("popup");
const content_element = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

// Membuat overlay popup
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

// Layer untuk titik-titik barbershop
// const barbershopLayer = new VectorLayer({
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: "data/titik_persebaran_barbershop.json", // URL data GeoJSON barbershop
//   }),
//   style: new Style({
//     image: new Icon({
//       anchor: [0.5, 1],
//       anchorXUnits: "fraction",
//       anchorYUnits: "fraction",
//       src: "icon/salon.png", // Ganti dengan icon sesuai
//       scale: 0.05,
//     }),
//   }),
// });



const barbershopLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/titik_persebaran_barbershop.json", // URL data GeoJSON barbershop
  }),
  style: function (feature) {
    // Menentukan ikon berdasarkan kategori
    let iconUrl = "icon/pria.png"; // Default icon untuk 'pria'
    const kategori = feature.get("Kategori");

    // Jika kategori adalah 'wanita', ganti ikon dengan beauty-treatment.png
    if (kategori === "Wanita") {
      iconUrl = "icon/perempuan.png";
    }
    if (kategori === "Pria / Wanita") {
      iconUrl = "icon/pria_wanita.png";
    }

    return new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: iconUrl, // Gunakan ikon yang sesuai berdasarkan kategori
        scale: 0.089,
      }),
    });
  },
});


// Layer untuk peta kecamatan Pekanbaru
const kecPku = new VectorLayer({
  background: "#1a2b39",
  source: new VectorSource({
    url: "data/map_pekanbaru.json", // URL data GeoJSON peta Pekanbaru
    format: new GeoJSON(),
  }),
  style: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "FID"],
      1,
      "#ffff33",
      100,
      "#3358ff",
    ],
  },
});

// Layer untuk peta wilayah Riau
const riau = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/polygon_riau.json", // URL data GeoJSON wilayah Riau
  }),
});

// Membuat peta OpenLayers
const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(), // Layer peta dasar menggunakan OSM
    }),
    kecPku, // Menambahkan layer peta Pekanbaru
    barbershopLayer, // Menambahkan layer barbershop
  ],
  overlays: [overlay], // Menambahkan overlay untuk popup
  view: new View({
    center: fromLonLat([101.447777, 0.507068]), // Koordinat Pekanbaru
    zoom: 8, // Zoom awal
  }),
});

// Event handler untuk menampilkan popup saat klik pada fitur
map.on("singleclick", function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });

  // Jika ada fitur yang diklik (misalnya, barbershop)
  if (feature) {
    const coordinate = evt.coordinate;

    // Mendapatkan data dari atribut fitur untuk popup
    const fotoLink = feature.get("Link Foto Drive"); // Link foto barbershop
    const imageContent = fotoLink ? `<img src="data/image/${fotoLink}" alt="Foto Barbershop" style="width: 200px; height: auto;">` : '<p>Foto tidak tersedia</p>';

    const content = `
      ${imageContent}
      <h3>${feature.get("Nama Salan / Barbershop")}</h3>
      <p>Alamat: ${feature.get("Alamat")}</p>
      <p>Kategori: ${feature.get("Kategori")}</p>
      <p>Layanan: ${feature.get("Jenis Layanan")}</p>
      <p>Kontak: ${feature.get("Kontak")}</p>
      <p>Jam Operasional: ${feature.get("Jam Operasional")}</p>
    `;

    // Menampilkan konten popup dan posisinya
    content_element.innerHTML = content;
    overlay.setPosition(coordinate);
  } else {
    overlay.setPosition(undefined); // Menutup popup jika tidak ada fitur
  }
});

// Event handler untuk menutup popup saat klik tombol close
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

// Menambahkan layer overlay untuk fitur yang disorot
const featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: {
    "stroke-color": "rgba(255, 255, 255, 0.7)",
    "stroke-width": 2,
  },
});

let highlight;

// Fungsi untuk menyorot fitur saat mouse bergerak
const highlightFeature = (pixel) => {
  const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

// Event listener untuk highlight saat pointer bergerak
map.on("pointermove", (evt) => {
  if (evt.dragging) {
    popup.setPosition(undefined);
    return;
  }

  const pixel = map.getEventPixel(evt.originalEvent);
  highlightFeature(pixel);
});

// Menampilkan dan menyembunyikan layer berdasarkan checkbox
const polygonLayerCheckbox = document.getElementById("polygon");
const pointLayerCheckbox = document.getElementById("point");

polygonLayerCheckbox.addEventListener("change", () => {
  kecPku.setVisible(polygonLayerCheckbox.checked);
});

pointLayerCheckbox.addEventListener("change", () => {
  barbershopLayer.setVisible(pointLayerCheckbox.checked);
});




















// import { format } from "ol/coordinate";
// import "./style.css";
// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import VectorLayer from "ol/layer/Vector";
// import { Vector as VectorSource } from "ol/source";
// import OSM from "ol/source/OSM";
// import { fromLonLat } from "ol/proj";
// import GeoJSON from "ol/format/GeoJSON";
// import { Icon, Style } from "ol/style.js";
// import Overlay from "ol/Overlay.js";

// // Popup overlay configuration
// const container = document.getElementById("popup");
// const content_element = document.getElementById("popup-content");
// const closer = document.getElementById("popup-closer");

// const overlay = new Overlay({
//   element: container,
//   autoPan: {
//     animation: {
//       duration: 250,
//     },
//   },
// });


// const kecPku = new VectorLayer({
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: "data/map_pekanbaru.json",
//   }),
//   style: {
//         "fill-color": [
//           "interpolate",
//           ["linear"],
//           ["get", "FID"],
//           1,
//           "#ffff33",
//           58,
//           "#3358ff",
//         ],
//       },
// });

// // Barbershop layer
// const barbershopLayer = new VectorLayer({
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: "data/titik_persebaran_barbershop.json", 
//   }),
//   style: new Style({
//     image: new Icon({
//       anchor: [0.5, 1],
//       anchorXUnits: "fraction",
//       anchorYUnits: "fraction",
//       src: "icon/barbershop.png", 
//       scale: 0.1, 
//     }),
//   }),
// });

// // Map configuration
// const map = new Map({
//   target: "map",
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//     kecPku, barbershopLayer
//   ],
//   overlays: [overlay],
//   view: new View({
//     center: fromLonLat([101.447777, 0.507068]), // Pekanbaru
//     zoom: 12,
//   }),
// });

// // Add overlay to map
// map.addOverlay(overlay);

// // Display popup on click
// map.on("singleclick", function (evt) {
//   const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
//   if (feature) {
//     const coordinate = evt.coordinate;
//     const content = `
//       <img src="data/image/${feature.get("Link Foto Drive")}" alt="Foto Barbershop" style="width: 200px; height: auto;">
//       <h3>${feature.get("Nama Salan / Barbershop")}</h3>
//       <p>Alamat: ${feature.get("Alamat")}</p>
//       <p>Kategori: ${feature.get("Kategori")}</p>
//       <p>Layanan: ${feature.get("Jenis Layanan")}</p>
//       <p>Kontak: ${feature.get("Kontak")}</p>
//       <p>Jam Operasional: ${feature.get("Jam Operasional")}</p>
//     `;
//     content_element.innerHTML = content;
//     overlay.setPosition(coordinate);
//   } else {
//     overlay.setPosition(undefined);
//   }
// });

// // Hide popup on close button click
// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };
