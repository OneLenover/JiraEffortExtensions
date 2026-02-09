console.log("JiraTaskEffort content script loaded!");

let bubbleAttached = false;

function createHintBubble(text) {
  const bubble = document.createElement("div");

  bubble.innerText = text;
  bubble.style.position = "absolute";
  bubble.style.background = "#1d7afc";
  bubble.style.color = "white";
  bubble.style.padding = "6px 10px";
  bubble.style.borderRadius = "8px";
  bubble.style.fontSize = "12px";
  bubble.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
  bubble.style.zIndex = "9999";
  bubble.style.maxWidth = "220px";
  bubble.style.pointerEvents = "none";

  return bubble;
}

function attachBubbleToElement(input, bubble) {
  const fieldGroup = input.closest(".field-group");
  if (!fieldGroup) return;

  fieldGroup.style.position = "relative";

  bubble.style.position = "absolute";
  bubble.style.top = "10%";
  bubble.style.right = "13%";

  fieldGroup.appendChild(bubble);
}


function tryAttachPriorityBubble() {
  if (bubbleAttached) return;

  const priorityInput = document.querySelector("#priority-field");
  if (!priorityInput) return;

  const bubble = createHintBubble("💡 Рекомендуемый приоритет: High");
  attachBubbleToElement(priorityInput, bubble);

  bubbleAttached = true;
  console.log("Priority hint attached");
}

const observer = new MutationObserver(() => {
  tryAttachPriorityBubble();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
