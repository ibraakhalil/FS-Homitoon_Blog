
let inputComment = document.querySelector("#comment")
let commentHolder = document.querySelector(".comment-holder")
function commentItem(data) {
    let div = document.createElement("div")
    let innerHtml = `
    <div class="comment-item">
        <div class="comment-body">
            <img src="/uploads/${data.user.profilePic}" alt="">
            <p>${data.body}</p>
        </div>
        <div class="controller">
            <ul>
                <li>Just Now</li>
                <li id="show-reply" style="cursor: pointer;">Reply</li>
                <li class="edit-comment">
                    Edit
                </li>
            </ul>
        </div>
        <div class="replies">
            <div class="reply-input">
                <input type="text" name="reply" data-comment="${data._id}" placeholder="Press enter to reply">
            </div>
            <div class="reply-holder">
            </div>
        </div>
    </div>`
    div.innerHTML = innerHtml

    return div
}

inputComment.addEventListener("keypress", (e) => {
    const postId = e.target.dataset.post
    const body = {
        body: e.target.value
    }

    if (e.key === 'Enter') {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/comments/${postId}`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            mode: 'cors'
        })

        fetch(req)
            .then(res => res.json())
            .then(data => {
                let div = commentItem(data)
                commentHolder.prepend(div)
                inputComment.value = ''
                let showReply = document.querySelector("#show-reply")
                let reply = document.querySelector(".replies")
                showReply.addEventListener("click", (e)=> {
                    reply.classList.toggle("show")
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }
})
