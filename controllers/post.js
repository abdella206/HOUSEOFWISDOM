const express = require('express');
const router = express.Router();
const passport = require('../config/passportConfig');
const db = require('../models');





///POST /post- creates a new post recored

router.post('/', function (req, res) {
    db.category.findOrCreate({
        where: {
            name: req.body.category,
            userId: req.user.id
        }
       
    }).spread(function(category, created) {
        category.createPost({
            content: req.body.content,
            userId: req.user.id
        }).then(function (post) {
                res.redirect("/profile");
            })
        })
        
    });






router.get('/:id/edit', function (req, res) {
    db.post.findOne({
        where:{id: parseInt(req.params.id)},
    }).then(function(post){
        res.render('edit', {post});
    });

   
});



router.put('/:id', function (req, res) {
    console.log(req.body)
    
    db.post.update({

        content: req.body.content
    }, {
            where: { id: parseInt(req.params.id) }
        }).then(function (post) {
            res.redirect('/profile')
        })

})





router.delete('/:id', function(req, res){

    db.post.destroy({
    where: {id: parseInt(req.params.id)}

}).then (function(post){
    res.redirect('/profile')
});
});
























module.exports = router;