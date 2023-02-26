window.onload = function() {
    tinymce.init({
        selector: "#editor",
        plugins: 'image autolink lists',
        toolbar: 'a11ycheck addcomment showcomments checklist code image pageembed permanentpen',
        automatic_uploads: true,
        images_upload_url: "/uploads/postimage",

        images_upload_handler: function(blobInfo, success, failure) {
            let headers = new Headers()
            headers.append("Accept", "Application/JSON")

            let formData = new formData()
            formData.append("post-image", blobInfo.blob(), blobInfo.filename())

            let req = new Request("/uploads/postimage", {
                method: "POST",
                headers,
                mode: "cors",
                body: formData  
            })

            fetch(req)
                .then(res => res.json())
                .then(data => success(data.imgUrl))
                .catch(() => failure("Http Error"))
        }
    })
}