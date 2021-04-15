const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorites = require('../models/favorites');
var authenticate = require('../authenticate');


const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')


    .get(authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .populate('user')
            .populate('dishes._id')
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                var newFavorite
                if (favorite == null) {
                    newFavorite = new Favorites({
                        user: req.user._id,
                        dishes: req.body
                    })
                    // newFavorite.save()
                    //     .catch(err => next(err))
                    //     .then((favorite) => {
                    //         Favorites.findById(favorite._id)
                    //             .populate('user')
                    //             .populate('dishes._id')
                    //             .then((favorite) => {
                    //                 res.statusCode = 200;
                    //                 res.setHeader('Content-Type', 'application/json');
                    //                 res.json(favorite);
                    //             })
                    //     }, (err) => next(err));
                }
                else {
                    for (var i = 0; i < req.body.length; i++) {
                        favorite.dishes.push(req.body[i])
                    }
                    console.log("favorite " + favorite.dishes)
                    // favorite.save()
                    //     .catch(err => next(err))
                    //     .then((favorite) => {
                    //         Favorites.findById(favorite._id)
                    //             .populate('user')
                    //             .populate('dishes._id')
                    //             .then((favorite) => {
                    //                 res.statusCode = 200;
                    //                 res.setHeader('Content-Type', 'application/json');
                    //                 res.json(favorite);
                    //             })
                    //     }, (err) => next(err));
                }
                console.log ("new fav" + newFavorite)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newFavorite);

            })
            .catch(err => next(err))
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// favoriteRouter.route('/:favoriteId')
// .get((req,res,next) => {
//     Dishes.findById(req.params.dishId)
//     .populate('comments.author')
//     .then((dish) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(dish);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

// .post(authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/'+ req.params.dishId);
// })
// .put(authenticate.verifyUser, (req, res, next) => {
//     Dishes.findByIdAndUpdate(req.params.dishId, {
//         $set: req.body
//     }, { new: true })
//     .then((dish) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(dish);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .delete(authenticate.verifyUser, (req, res, next) => {
//     Dishes.findByIdAndRemove(req.params.dishId)
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });



module.exports = favoriteRouter