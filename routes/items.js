var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(request, response){
    Item.list(function(items){
        response.json(items);
    }, function(error){
        response.status(400).json(error);
    });
});

router.post('/items', function(request, response){
    Item.save(request.body.name, function(item){
        response.status(201).json(item);
    }, function(err){
        response.status(400).json(err);
    });
});

router.put('/items/:id', function(request, response){
    Item.update(request.params.id, request.body.name, function(item){
        response.status(200).json(item);
    }, function(error){
        console.log(error);
        response.status(204).json(error);
    });
});

router.delete('/items/:id', function(request, response){
    console.log(request.params.id + " in the router-delete");
    Item.delete(request.params.id, function(item){
       response.status(200).json(item);
    }, function(err){
       response.status(400).json(err);
    });
});

module.exports = router;