let flashMessage = document.querySelector(".flash-message")

if(flashMessage) {
    const times = document.querySelector(".times")

    flashMessage.classList.add("active")

    setTimeout(() => {
        flashMessage.classList.remove("active")
    }, 5000);

    times.addEventListener("click", (e) => {
        flashMessage.classList.remove("active")
    })
}