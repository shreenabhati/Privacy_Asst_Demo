// Attach event handlers to the accept/reject buttons

const acceptButtons = document.querySelectorAll("#acceptButton");
acceptButtons.forEach((button) => {
  button.addEventListener("mouseover", (event) => {
    const suggestionListElement = document.querySelector("#suggestion-list");
    if (suggestionListElement.style.display === "none") {
      const word = event.target.innerText;
      const suggestions = getSuggestions(word);
      showSuggestionsOnHover(event.clientX, event.clientY, suggestions);
    }
  });
});
acceptButtons.forEach((button) => {
  button.addEventListener("mouseout", (event) => {
    hideSuggestionsHover();
  });
});

// Attach event handlers to the text
const text = document.querySelector("#acceptButton");
text.addEventListener("click", (event) => {
  const suggestionHoverElement = document.querySelector("#suggestion-hover");
  suggestionHoverElement.style.display = "none";
  // get element by ID for this text
  console.log(event.target.innerText);
  const word = event.target.innerText;
  const suggestions = getSuggestions(word);
  showSuggestions(event.clientX, event.clientY, suggestions);
});

// Send requests to the Flask server
// function sendSelection(suggestionId, accepted) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "/selection");
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log("Selection sent successfully");
//     } else {
//       console.error("Failed to send selection");
//     }
//   };
//   xhr.send(JSON.stringify({ suggestionId, accepted }));
// }

function getSuggestions(word) {
  // TODO: Implement function to get suggestions from Flask server
  if (word === "J Doe") {
    return [
      { id: 1, text: "Jane Doe" },
      { id: 2, text: "J.D" },
      { id: 3, text: "Jane D." },
    ];
  }
  if (word === "J.D") {
    return [
      { id: 1, text: "J Doe" },
      { id: 2, text: "Jane Doe" },
      { id: 3, text: "Jane D." },
    ];
  }
  if (word === "Jane D.") {
    return [
      { id: 1, text: "J Doe" },
      { id: 2, text: "J.D" },
      { id: 3, text: "Jane Doe" },
    ];
  }
  return [
    { id: 1, text: "J Doe" },
    { id: 2, text: "J.D" },
    { id: 3, text: "Jane D." },
  ];
}
function onClickOfListItem(event) {
  const buttonElement = document.querySelector("#acceptButton");
  buttonElement.innerText = event.target.innerText;
  const suggestionList = document.querySelector("#suggestion-list");
  suggestionList.style.display = "none";
}
function showSuggestions(x, y, suggestions) {
  const suggestionList = document.querySelector("#suggestion-list");
  suggestionList.innerHTML = "";
  for (const suggestion of suggestions) {
    const suggestionElement = document.createElement("li");
    suggestionElement.innerText = suggestion.text;
    suggestionElement.onclick = onClickOfListItem;
    suggestionElement.dataset.suggestionId = suggestion.id;
    suggestionElement.style.paddingTop = "5px";
    suggestionElement.style.paddingBottom = "5px";

    suggestionElement.addEventListener("mouseover", (e) => {
      e.target.classList.add("active-suggestion");
    });
    suggestionElement.addEventListener("mouseout", (e) => {
      e.target.classList.remove("active-suggestion");
    });

    suggestionList.appendChild(suggestionElement);
  }
  suggestionList.style.display = "block";
  suggestionList.style.paddingTop = "5px";
  suggestionList.style.paddingBottom = "5px";
  // suggestionList.style.top = y + "px";
  // suggestionList.style.left = x + "px";
}
function showSuggestionsOnHover(x, y, suggestions) {
  const suggestionList = document.querySelector("#suggestion-hover");
  suggestionList.innerHTML = "";
  for (const suggestion of suggestions) {
    const suggestionElement = document.createElement("li");
    suggestionElement.innerText = suggestion.text;
    suggestionElement.onclick = onClickOfListItem;
    suggestionElement.dataset.suggestionId = suggestion.id;
    suggestionElement.style.paddingTop = "5px";
    suggestionElement.style.paddingBottom = "5px";

    suggestionElement.addEventListener("mouseover", (e) => {
      e.target.classList.add("active-suggestion");
    });
    suggestionElement.addEventListener("mouseout", (e) => {
      e.target.classList.remove("active-suggestion");
    });

    suggestionList.appendChild(suggestionElement);
  }
  suggestionList.style.display = "block";
  suggestionList.style.paddingTop = "5px";
  suggestionList.style.paddingBottom = "5px";
  // suggestionList.style.top = y + "px";
  // suggestionList.style.left = x + "px";
}

function hideSuggestions() {
  const suggestionList = document.querySelector("#suggestion-list");
  suggestionList.style.display = "none";
}

function hideSuggestionsHover() {
  const suggestionList = document.querySelector("#suggestion-hover");
  suggestionList.style.display = "none";
}
