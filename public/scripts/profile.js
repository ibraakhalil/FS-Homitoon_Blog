
const $ = target => document.querySelector(target)

$(".upload input").addEventListener("change", (e) => {

    const url = URL.createObjectURL($(".upload input").files[0])

    $(".upload .user-image img").src = url;
})

