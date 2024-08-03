const textTags = ['p', 'li', 'span', 'strong', 'em', 'div'];

const leftPage = document.querySelector("#leftPage");
const rightPage = document.querySelector("#rightPage");

const synth = window.speechSynthesis;

let isSpeaking = false;

const button = document.createElement("button");
button.textContent = "Start Reading";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
document.body.appendChild(button);

let currentUtterance = null;
let currentElement = null;

const findTextElements = (container) => {
  let textElements = [];
  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      textElements.push(node.parentElement);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(traverse);
    }
  };
  container.childNodes.forEach(traverse);
  return textElements;
};

const readContent = async (elements) => {
  for (let element of elements) {
    if (!isSpeaking) break;

    if (currentElement) currentElement.classList.remove('highlight');
    currentElement = element;
    currentElement.classList.add('highlight');

    const textContent = element.textContent.trim();
    if (textContent) {
      currentUtterance = new SpeechSynthesisUtterance(textContent);
      currentUtterance.onend = () => synth.cancel();
      synth.speak(currentUtterance);
      
      await new Promise((resolve) => currentUtterance.onend = resolve);
    }
  }
};

const toggleSpeech = async () => {
  if (isSpeaking) {
    synth.cancel();
    isSpeaking = false;
    if (currentElement) currentElement.classList.remove('highlight');
    button.textContent = "Start Reading";
  } else {
    isSpeaking = true;
    button.textContent = "Stop Reading";

    const leftTextElements = findTextElements(leftPage);
    const rightTextElements = findTextElements(rightPage);

    await readContent(leftTextElements);

    if (!isSpeaking) return;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!isSpeaking) return;

    await readContent(rightTextElements);

    isSpeaking = false;
    button.textContent = "Start Reading";
  }
};

button.addEventListener("click", toggleSpeech);
