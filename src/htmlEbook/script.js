// List of tags that typically contain text, including div
const textTags = ['p', 'li', 'span', 'strong', 'em', 'div'];

// Select the page elements
const leftPage = document.querySelector("#leftPage");
const rightPage = document.querySelector("#rightPage");

// Create a new instance of the SpeechSynthesis API
const synth = window.speechSynthesis;

// Variable to keep track of whether speech is playing
let isSpeaking = false;

// Create and configure the button
const button = document.createElement("button");
button.textContent = "Start Reading";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
document.body.appendChild(button);

// Variable to store the current utterance and the element being read
let currentUtterance = null;
let currentElement = null;

// Function to find all text elements in a container
const findTextElements = (container) => {
  let textElements = [];
  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // Add the parent element of the text node to the textElements array
      textElements.push(node.parentElement);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(traverse);
    }
  };
  container.childNodes.forEach(traverse);
  return textElements;
};

// Function to read content and highlight the corresponding text element
const readContent = async (elements) => {
  for (let element of elements) {
    if (!isSpeaking) break;

    // Highlight the current element
    if (currentElement) currentElement.classList.remove('highlight');
    currentElement = element;
    currentElement.classList.add('highlight');

    // Create a new utterance for the current element's text content
    const textContent = element.textContent.trim();
    if (textContent) {
      currentUtterance = new SpeechSynthesisUtterance(textContent);
      currentUtterance.onend = () => synth.cancel();
      synth.speak(currentUtterance);
      
      // Wait until the speech ends before proceeding
      await new Promise((resolve) => currentUtterance.onend = resolve);
    }
  }
};

// Function to toggle speech
const toggleSpeech = async () => {
  if (isSpeaking) {
    // Stop the speech
    synth.cancel();
    isSpeaking = false;
    if (currentElement) currentElement.classList.remove('highlight');
    button.textContent = "Start Reading";
  } else {
    isSpeaking = true;
    button.textContent = "Stop Reading";

    // Find all text elements in both pages
    const leftTextElements = findTextElements(leftPage);
    const rightTextElements = findTextElements(rightPage);

    // Read the left page content and highlight
    await readContent(leftTextElements);

    // Check if stopped during reading
    if (!isSpeaking) return;

    // Pause for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if stopped during pause
    if (!isSpeaking) return;

    // Read the right page content and highlight
    await readContent(rightTextElements);

    // Reset the button state
    isSpeaking = false;
    button.textContent = "Start Reading";
  }
};

// Add event listener to the button
button.addEventListener("click", toggleSpeech);
