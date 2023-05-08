const darkMode = document.querySelector(".dark-mode");
darkMode.addEventListener("click", () =>
{
    darkMode.classList[1] == "bi-moon-fill" ? darkMode.classList.replace("bi-moon-fill", "bi-sun-fill") : darkMode.classList.replace("bi-sun-fill", "bi-moon-fill")

})

//=================> NOTIFICATIONS <=================//
function remove()
{
    let notification = document.querySelector(".notification")
    notification.classList.add("remove")
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