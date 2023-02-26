(function() {
    const likeBtn = document.querySelector(".like")
    const dislikeBtn = document.querySelector(".dislike")

    

    function reqLikeDislike (button, postId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${button}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
    }

    likeBtn.addEventListener("click", (e) => {
        const postId = e.target.dataset.post

        reqLikeDislike("like", postId)
            .then(res => res.json())
            .then(data => {
                if(data.error) {
                    return console.log(data);
                }
                let liketext = `${data.like ? "Liked" : "Like" }` + ` (${data.likesCount})`

                likeBtn.innerHTML = liketext
                dislikeBtn.innerHTML = `Dislike (${data.dislikesCount})`
            })
            .catch(e => {
                console.log(e);
            })
    })

    dislikeBtn.addEventListener("click", (e) => {
        const postId = e.target.dataset.post

        reqLikeDislike("dislike", postId)
            .then(res => res.json())
            .then(data => {
                if(data.error) {
                    return console.log(data);
                }
                let disliketext = `${data.dislike ? "Disliked" : "Dislike" }` + ` (${data.dislikesCount})`

                dislikeBtn.innerHTML = disliketext
                likeBtn.innerHTML = `Like (${data.likesCount})`
            })
            .catch(e => {
                console.log(e);
            })
    })
})()