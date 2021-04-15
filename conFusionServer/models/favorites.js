const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;

var dishesList = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
    }
}, {
    timestamps: true
});

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
        require:true
    },
    dishes: [dishesList]
    
}, {
    timestamps: true
});

favoriteSchema.index({ dish: 1, author: 1}, { unique: true });

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;
