const darkMode = document.querySelector(".dark-mode");
const main = document.querySelector("main");
const titles = document.querySelectorAll(".title");
const header = document.querySelector("header");
const linkMenu = document.querySelectorAll(".link");
const boxNote = document.querySelector(".box-note");

const bgDark = "#333";
const bgLight = "#fff";
const fontDark = "#666";
const fontLight = "#fff";
const storageKey = "dark-mode-enabled";

//=================> DARK MODE <=================//
function setDarkMode(enabled) {
  if (enabled) {
    darkMode.classList.replace("bi-moon-fill", "bi-sun-fill");
    darkMode.style.color = "#fbff00";

    header.style.background = bgLight;
    linkMenu.forEach(link => (link.style.color = fontDark));

    main.style.backgroundColor = bgLight;
    titles.forEach(t => (t.style.color = fontDark));

    boxNote.style.backgroundColor = bgDark;
    boxNote.style.color = fontLight;
  } else {
    darkMode.classList.replace("bi-sun-fill", "bi-moon-fill");
    darkMode.style.color = "#666";

    header.style.background = bgDark;
    linkMenu.forEach(link => (link.style.color = fontLight));

    main.style.backgroundColor = bgDark;
    titles.forEach(t => (t.style.color = fontLight));

    boxNote.style.backgroundColor = bgLight;
    boxNote.style.color = fontDark;
  }
}

// initialize dark mode state on page load
const darkModeEnabled = localStorage.getItem(storageKey) === "true";
setDarkMode(darkModeEnabled);

// toggle dark mode on click
darkMode.addEventListener("click", () => {
  const enabled = !darkMode.classList.contains("bi-sun-fill");
  localStorage.setItem(storageKey, enabled);
  setDarkMode(enabled);
});


    //darkMode.classList[1] == "bi-moon-fill" ? darkMode.classList.replace("bi-moon-fill", "bi-sun-fill") : darkMode.classList.replace("bi-sun-fill", "bi-moon-fill")


//=================> NOTIFICATIONS <=================//

function remove() {
    let notification = document.querySelector(".notification");
    notification.classList.add("remove");
  }

//=================> REMOVE NOTE <=================//

function deleteNote(noteId)
{
    fetch("/delete-note", {
        method: "POST",
        body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
        window.location.href = "/note";
    });
}