<script>
  // Function to handle orientation change
  function handleOrientationChange() {
    var angle = window.orientation;

    if (angle === 90 || angle === -90) {
      // Landscape orientation
      document.body.style.transform = 'rotate(-90deg)';
      document.body.style.transformOrigin = 'top left';
    } else {
      // Portrait orientation
      document.body.style.transform = 'none';
    }
  }

  // Initial orientation check
  handleOrientationChange();

  // Event listener for orientation change
  window.addEventListener('orientationchange', handleOrientationChange);
</script>
