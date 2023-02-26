

let replyInputs = document.querySelectorAll("#reply")
let replies = document.querySelectorAll(".replies")
let showReplies = document.querySelectorAll("#show-reply")

showReplies.forEach((showReply, index) => {
    showReply.addEventListener("click",(e) => {
        console.log(showReplies);
        replies[index].classList.toggle('show')
    })
})

function replyAppend(data) {
    let div = document.createElement("div")
    let innerHtml  = `
    <div class="reply-item">
        <img src="/uploads/${data.profilePic}" alt="">
        <div class="reply-body">
            ${data.body}
        </div>
    </div>`
    div.innerHTML = innerHtml

    return div
}


replyInputs.forEach((replyInput) => {
    replyInput.addEventListener("keypress", e => {
        let commentId = e.target.dataset.comment
        let replyBody = {
            body: e.target.value
        }
        if(e.key === "Enter") {
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')
            headers.append('Content-Type', 'Application/JSON')

            let req = new Request(`/api/comments/replies/${commentId}`, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify(replyBody)
            })

            fetch(req)
                .then(res => res.json())
                .then(data => {
                    let div = replyAppend(data)
                    replyInput.parentElement.nextElementSibling.prepend(div)
                    e.target.value = ''
                })
                .catch(e => {
                    console.log(e);
                    alert(e.message)
                })
        }
    })
})


