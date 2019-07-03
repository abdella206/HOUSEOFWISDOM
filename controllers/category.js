const express = require('express');
const router = express.Router();
const passport = require('../config/passportConfig');
const db = require('../models');


//GET /categories -index - show all the categories!
router.get('/', function(req, res) {
    db.category.findAll({
        where: {userId: req.user.id}
    }).then(function(categories) {
        res.render('categories/index', {categories});
    });
});







router.delete('/:id', function(req, res){

    db.category.destroy({
    where: {id: parseInt(req.params.id)}

}).then (function(category){
    res.redirect('/profile')
});
});



// //POST /categories - post them
// router.post('/', function(req, res){
//     db.post.findByPk(parseInt(req.body.postId)).then(function(post) {
//         db.category.findOrCreate({
//             where: {
//                 name: req.body.category
//             },
//             defaults: {
//                 userId: req.user.id
//             }
//         }).spread(function(category, created) {
//             category.addPost(post).then(function(post) {
//                 console.log(`${category} added to ${post}`)
//                 res.redirect('/posts/' + req.body.postId);
//             })
//         })
//     })
// })


//GET /categories/:id - show one categories and its associated projects
router.get('/:id', function(req, res){
    db.category.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.post]
    }).then(function(category){
        console.log(category)
            res.render('categories/show', {category});
        });
});



module.exports = router;