import "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";

const middleOfUSA = [-100, 40];

async function getLocation() {
  try {
    const response = await fetch("rots.json");
    const json = await response.json();
    if (typeof json.lat === "number" && typeof json.lon === "number") {
      return [json.lon, json.lat];
    }
  } catch (error) {}
  return middleOfUSA;
}

async function init() {
  const map = new maplibregl.Map({
    style: "https://tiles.openfreemap.org/styles/liberty",
    zoom: 2,
    container: "map",
  });
  const location = await getLocation();
  if (location !== middleOfUSA) {
    map.flyTo({ center: location, zoom: 10 });
    
    new maplibregl.Popup({
      closeOnClick: false,
      focusAfterOpen: false
    })
    .setLngLat(location)
    .setHTML("<h3>\"Je huis op de rots bouwen\"</h3>")
    .addTo(map);
  }
}

init();