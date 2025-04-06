let story;

async function loadStory() {
  const response = await fetch("story.json");
  const storyContent = await response.json();
  story = new inkjs.Story(storyContent);

  continueStory();
}

function continueStory() {
  const storyContainer = document.getElementById("story");

  while (story.canContinue) {
    const paragraph = document.createElement("p");
    paragraph.textContent = story.Continue();
    storyContainer.appendChild(paragraph);
  }

  // Present choices
  if (story.currentChoices.length > 0) {
    story.currentChoices.forEach((choice, index) => {
      const choiceEl = document.createElement("button");
      choiceEl.textContent = choice.text;
      choiceEl.classList.add("choice-button");
      choiceEl.addEventListener("click", () => {
        story.ChooseChoiceIndex(index);
        clearStory();
        continueStory();
      });
      storyContainer.appendChild(choiceEl);
    });
  } else if (!story.canContinue && story.currentChoices.length === 0) {
    const endEl = document.createElement("p");
    endEl.textContent = "— The End —";
    storyContainer.appendChild(endEl);
  }
}

function clearStory() {
  const storyContainer = document.getElementById("story");
  storyContainer.innerHTML = "";
}

// Start the story once the page has loaded
window.addEventListener("load", loadStory);
