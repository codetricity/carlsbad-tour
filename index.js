// Create viewer.
const viewer = new Marzipano.Viewer(document.getElementById("pano"));

// Create geometry.
const geometry = new Marzipano.EquirectGeometry([{ width: 7296 }]);
const limiter = Marzipano.RectilinearView.limit.traditional(4000, 100*Math.PI/180);

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
      // Create a hotspot element
      let hotspot = hotspots[hsi];
      let hotspotElement = document.createElement("div");
      hotspotElement.classList.add("hotspot");
      hotspotElement.innerHTML = `<img src="icons/${hotspot.icon}" class="hotspot-icon">`;

      // Define the hotspot's position
      let hotspotPosition = { yaw: hotspot.yaw, pitch: hotspot.pitch };
      // Add a click event listener to the hotspot
      hotspotElement.addEventListener("click", function () {
        // Switch to the new scene
        console.log(`hotspot links to scene ${hotspot.switchTo}`);
        console.log(scenes[hotspot.switchTo]);
        scenes[hotspot.switchTo].switchTo();
        currentView = scenes[hotspot.switchTo].view(); // Update the active view
      });
      // Create the hotspot
      scene.hotspotContainer().createHotspot(hotspotElement, hotspotPosition);
    }
  }
  scenes.push(scene);
  if (i === 0) {
    currentView = view; // Set the initial active view
    scene.switchTo();
  }
}

// add a way to get the coordinates of a point for editing
// the tour
// Add an event listener for mouse click
document.getElementById("pano").addEventListener("mousedown", function (event) {
  document.body.style.cursor = "move";
  let longClickTimeout;
  longClickTimeout = setTimeout(function () {
    console.log("Long click detected!");

    // Get the DOM element for the viewer
    var element = viewer.domElement();
    var rect = element.getBoundingClientRect();

    // Calculate relative pointer coordinates
    var relativeX = event.clientX - rect.left;
    var relativeY = event.clientY - rect.top;

    // Convert to normalized coordinates (0 to 1)
    var x = relativeX / rect.width;
    var y = relativeY / rect.height;
    // Use the correct method: screenToCoordinates
    var result = currentView.screenToCoordinates({ x: relativeX, y: relativeY });

    if (result) {
      alert(
        `Selected point is now in clipboard:\nYaw: ${result.yaw}, Pitch: ${result.pitch}`
      );
      navigator.clipboard.writeText(
        `yaw: ${result.yaw}, pitch: ${result.pitch}`
      );
    } else {
      console.log("Pointer is outside the view bounds.");
    }
  }, 4000);
  // Clear the timer on mouseup or mouseout to prevent long click
  function clearLongClick() {
    clearTimeout(longClickTimeout);
    document.removeEventListener("mouseup", clearLongClick);
    document.removeEventListener("mouseout", clearLongClick);
    document.body.style.cursor = "default";
  }

  document.addEventListener("mouseup", clearLongClick);
  document.addEventListener("mouseout", clearLongClick);
});
