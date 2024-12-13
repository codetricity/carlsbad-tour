// Create viewer.
const viewer = new Marzipano.Viewer(document.getElementById("pano"));

// Create geometry.
const geometry = new Marzipano.EquirectGeometry([{ width: 7296 }]);

let scenes = [];

for (let i = 0; i < data.length; i++) {
  let image = data[0];
  // Create source.
  let source = Marzipano.ImageUrlSource.fromString(`images/${image.filename}`);

  // Create view.
  let view = new Marzipano.RectilinearView({
    yaw: image.yaw,
    pitch: image.pitch,
  });

  // Create scene.
  let scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
  });

  if (image.hasOwnProperty('hotspots')) {
    let hotspots = image.hotspots;

    // Create a hotspot element
    let hotspotElement = document.createElement("div");
    hotspotElement.classList.add("hotspot");
    hotspotElement.innerHTML = `<img src="icons/${hotspots[0].icon}" class="hotspot-icon">`;

    // Define the hotspot's position
    let hotspotPosition = { yaw: 0, pitch: 0 };

    // Create the hotspot
    scene.hotspotContainer().createHotspot(hotspotElement, hotspotPosition);
  } 
  scenes.push(scene);
}
// Display scene.
scenes[0].switchTo();
