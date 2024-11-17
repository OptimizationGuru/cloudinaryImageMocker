// Function to update the image size based on window size
const updateDimensions = () => {
  const screenWidth = window.innerWidth;
  let width = screenWidth * 0.8;
  let height = width * 0.75; // Maintain aspect ratio (3:4)

  if (width > 1200) width = 1200;
  if (height > 900) height = 900;

  return { width: width, height: height };
};

export default updateDimensions;
