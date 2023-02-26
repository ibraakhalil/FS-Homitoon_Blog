window.onload = () => {

    let bookmarks = document.querySelectorAll(".details .bookmark")

    bookmarks.forEach((bookmark) => {
        bookmark.addEventListener("click", (e) => {
            let postId = e.target.dataset.post
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')
            headers.append('Content-Type', 'Application/JSON')


            let req = new Request(`/api/bookmark/${postId}`,{
                method: 'GET',
                headers,
                mode: 'cors'
            })

            fetch(req)
                .then(res => res.json())
                .then(data => {
                    if(data.bookmark) {
                        bookmark.innerHTML = '&#9733;'
                    } else {
                        bookmark.innerHTML = '&#9734;'
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })       
    });





}