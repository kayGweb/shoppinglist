var Item = require('../models/item');

exports.save = function(name, callback, errback){
    Item.create({name: name}, function(error, item){
        if(error){
            errback(error);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback){
    Item.find(function(error, items){
        if(error){
            errback(error);
            return;
        }
        callback(items);
    });
};
    
exports.update = function(id, name, callback, errback){
    Item.findOneAndUpdate({_id: id}, {name: name}, {upsert: true}, function(error, item){
        if(error){
            errback(error);
            return;
        }
        callback(item);
    });
};

exports.delete = function( id, callback, errback){
    Item.findOneAndRemove({_id: id}, function(error, item){
        if(error){
            errback(error);
            return;
        }
        callback(item);
    });
};