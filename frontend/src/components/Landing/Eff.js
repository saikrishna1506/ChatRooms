// Define your landing title and text
const titleText = "Your Project Title";
const landingTitle = document.getElementById("landing-title");

// Function to create the typing effect
function typeWriter(text, i, callback) {
  if (i < text.length) {
    landingTitle.innerHTML = text.substring(0, i + 1);
    setTimeout(() => {
      typeWriter(text, i + 1, callback);
    }, 50); // Adjust typing speed here (lower value for faster typing)
    
  } else {
    if (typeof callback === "function") {
      callback();
    }
  }
}

// Call the typing effect function
typeWriter(titleText, 0);