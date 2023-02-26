const Post = require("../models/post")
const getFlashMessage = require("../utils/flash")



const searchResultController = async (req, res, next) => {

    let term = req.query.term
    let currentPage = Number(req.query.page)
    let itemPerPage = 2


    try {
            let posts = await Post.find(
                { $text: { $search: term } 
            }).skip((itemPerPage * currentPage) - itemPerPage)
              .limit(itemPerPage)

              let totalPost = await Post.countDocuments(
                { $text: { $search: term } 
            })

              let totalPage = totalPost / itemPerPage
              res.render('pages/post/search', {
                  flash: getFlashMessage(req),
                  posts,
                  currentPage,
                  term,
                  totalPage,
                  itemPerPage
              })
              
    } catch (err) {
        next(err)
    }
}


module.exports = { searchResultController }