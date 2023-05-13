var theme;

if(document.readyState == "loading")
{
    theme = localStorage.getItem("theme")
    if(theme == "light")
    {
        document.addEventListener("DOMContentLoaded", light)
    }
    else
    {
        document.addEventListener("DOMContentLoaded", dark)
    }    
}
else
{
    light()
}


const darkMode = document.querySelector(".dark-mode");
const main = document.querySelector("main")
const titles = document.getElementsByClassName("title")
const header = document.querySelector("header")
//const linkMenu = document.querySelectorAll(".link")
const boxNote = document.getElementsByTagName("textarea")[0]


const bgDark = "#333"
const bgLight = "#fff"
const fontDark = "#666"
const fontLight = "#fff"

//=================> DARK MODE <=================//
darkMode.addEventListener("click", () =>
{
    if(darkMode.classList[1] == "bi-moon-fill")
    {
        light()
    }
    else
    {  
        dark()
    }
});

    //darkMode.classList[1] == "bi-moon-fill" ? darkMode.classList.replace("bi-moon-fill", "bi-sun-fill") : darkMode.classList.replace("bi-sun-fill", "bi-moon-fill")

function light()
{
    darkMode.classList.replace("bi-moon-fill", "bi-sun-fill")
    darkMode.style.color = "#fbff00"

    header.style.background = bgLight
    // Array.from(linkMenu).forEach(link => {
    //     link.style.color = fontDark
    // });

    main.style.backgroundColor = bgLight
    Array.from(titles).forEach(t => { // converta a coleção HTML em um array e chame forEach()
        t.style.color = fontDark
    });

    boxNote.style.backgroundColor = bgDark
    boxNote.style.color = fontLight
    

    theme = "light"
    localStorage.setItem("theme", theme)
}
function dark()
{
    darkMode.classList.replace("bi-sun-fill", "bi-moon-fill")
    darkMode.style.color = "#666"

    header.style.background = bgDark
    // Array.from(linkMenu).forEach(link => {
    //     link.style.color = fontLight
    // });

    main.style.backgroundColor = bgDark
    Array.from(titles).forEach(t => { // converta a coleção HTML em um array e chame forEach()
        t.style.color = fontLight
    });   

    boxNote.style.backgroundColor = bgLight
    boxNote.style.color = fontDark

    theme = "dark"
    localStorage.setItem("theme", theme)
}





//=================> NOTIFICATIONS <=================//
// seleciona todos os elementos com a classe "notification"
var notifications = document.querySelectorAll('.notification');

// percorre todos os elementos e define um atraso de 5 segundos para remover cada um
for (var i = 0; i < notifications.length; i++) {
  var notification = notifications[i];
  setTimeout(function() {
    // adiciona a classe 'hidden' para ocultar a notificação
    notification.classList.add('hidden');
    
    // remove o elemento do DOM após 1 segundo (1000 milissegundos)
    setTimeout(function() {
      notification.parentNode.removeChild(notification);
    }, 1000);
  }, 3000);
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