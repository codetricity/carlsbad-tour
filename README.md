# Carlsbad Cavern Tour with Marzipano

![screenshot](readme_assets/screenshot.png)

[live site](https://codetricity.github.io/carlsbad-tour/)

## data format

There does not appear to be standard format for virtual tour
information on objects such as scenes, pitch, yaw, hotspots,
and settings.

The data I'm using looks like this:

```json
const data = [
  {
    filename: "carlsbad_0.jpg",
    yaw: 0.009621012850468347,
    pitch: 0.5,
    hotspots: [
      {
        yaw: -0.8043556272753545,
        pitch: -0.10639414611516074,
        switchTo: 1,
        icon: "up.png",
      },
```

## Pitch and Yaw

Pitch is up and down.  Yaw is right to left.
The degrees are in radians.  `2 * pi` is a full 360 degree
circle.  `1 * pi` is 180 degrees.  

![pitch and yaw](readme_assets/pitch-yaw.png)

### Getting pitch and yaw

As this is an educational project, I am getting the pitch
and yaw by clicking the mouse on a scene in the viewer
and calculating
the pitch and yaw.

To get the pitch and yaw of specific points in a scene,
I added a rudimentary tool that saves pitch and yaw to the
clipboard.  These values are then pasted into `data.json`.

The pitch and yaw tool appears when the mouse is pressed
for more than 3.1 seconds.

![pitch-yaw-alert](readme_assets/pitch-yaw-alert.png)

This is the relevant code.

```javascript
// Convert to normalized coordinates (0 to 1)
var x = relativeX / rect.width;
var y = relativeY / rect.height;
// Use  method from Marzipano View: screenToCoordinates
var result = currentView.screenToCoordinates({ x: relativeX, y: relativeY });
```

The result has properties for pitch and yaw.

```text
Yaw: ${result.yaw}, Pitch: ${result.pitch}`
```

For initial view, placing mouse in center of screen gives the center
of the view.

For the hotspot, the mouse is in the upper right corner.

## images

Images are from a RICOH THETA Z1 taken by the National Park
Service and released under the [Public Domain, No Copyright](https://creativecommons.org/publicdomain/mark/1.0/).

Photostream

<https://www.flickr.com/photos/193079646@N03/with/52283079899>
