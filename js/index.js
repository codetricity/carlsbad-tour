// Import the panoMousedownHandler function
import { panoMousedownHandler } from './panoHandler.js';
import { data } from '../data/data.js';

// Create viewer.
const viewer = new Marzipano.Viewer(document.getElementById("pano"));

// Create geometry.
const geometry = new Marzipano.EquirectGeometry([{ width: 7296 }]);
const limiter = Marzipano.RectilinearView.limit.traditional(4000, 100 * Math.PI / 180);

let scenes = [];
let currentView = null; // Track the active view

for (let i = 0; i < data.length; i++) {
  let image = data[i];
  // Create source.
  let source = Marzipano.ImageUrlSource.fromString(`images/${image.filename}`);
  console.log(`image ${i} - setting yaw to ${image.yaw}`);

  let view = new Marzipano.RectilinearView({
    yaw: image.yaw,
    pitch: image.pitch,
  }, limiter);

  // Create scene.
  let scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
  });

  if (image.hasOwnProperty("hotspots")) {
    let hotspots = image.hotspots;

    for (let hsi = 0; hsi < hotspots.length; hsi++) {
      let hotspot = hotspots[hsi];
      let hotspotElement = document.createElement("div");
      hotspotElement.classList.add("hotspot");
      hotspotElement.innerHTML = `<img src="icons/${hotspot.icon}" class="hotspot-icon">`;

      let hotspotPosition = { yaw: hotspot.yaw, pitch: hotspot.pitch };
      hotspotElement.addEventListener("click", function () {
        console.log(`hotspot links to scene ${hotspot.switchTo}`);
        console.log(scenes[hotspot.switchTo]);
        scenes[hotspot.switchTo].switchTo();
        currentView = scenes[hotspot.switchTo].view(); // Update the active view
      });

      scene.hotspotContainer().createHotspot(hotspotElement, hotspotPosition);
    }
  }
  scenes.push(scene);
  if (i === 0) {
    currentView = view; // Set the initial active view
    scene.switchTo();
  }
}

// Attach the mousedown handler to the pano element
document
  .getElementById("pano")
  .addEventListener("mousedown", (event) => panoMousedownHandler(event, viewer, currentView));
