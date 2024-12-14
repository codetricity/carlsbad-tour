export function panoMousedownHandler(event, viewer, currentView) {
    document.body.style.cursor = "move";
    let longClickTimeout;
  
    longClickTimeout = setTimeout(function () {
      console.log("Long click detected!");
  
      let element = viewer.domElement();
      let rect = element.getBoundingClientRect();
  
      let relativeX = event.clientX - rect.left;
      let relativeY = event.clientY - rect.top;
  
      let result = currentView.screenToCoordinates({ x: relativeX, y: relativeY });
  
      if (result) {
        viewer.controls().disable();
        alert(
          `Selected point is now in clipboard:\nYaw: ${result.yaw}, Pitch: ${result.pitch}`
        );
        navigator.clipboard.writeText(
          `yaw: ${result.yaw}, pitch: ${result.pitch}`
        );
  
        viewer.stopMovement();
        viewer.controls().enable();
        clearLongClick();
      } else {
        console.log("Pointer is outside the view bounds.");
      }
    }, 4000);
  
    function clearLongClick() {
      clearTimeout(longClickTimeout);
      document.body.style.cursor = "default";
      viewer.stopMovement();
    }
  
    document.addEventListener("mouseup", clearLongClick);
    document.addEventListener("mouseout", clearLongClick);
    event.preventDefault();
  }
  