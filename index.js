// Create viewer.
const viewer = new Marzipano.Viewer(document.getElementById('pano'));



// Create geometry.
const geometry = new Marzipano.EquirectGeometry([{ width: 7296 }]);

let scenes = [];

for (let i = 0; i < data.length; i++ ) {
    let image = data[0];
    // Create source.
    let source = Marzipano.ImageUrlSource.fromString(
        `images/${image.filename}`
    );

    // Create view.
    let view = new Marzipano.RectilinearView({ 
        yaw: image.yaw,
        pitch: image.pitch });

    // Create scene.
    let scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    });
    scenes.push(scene)
}
// Display scene.
scenes[0].switchTo();