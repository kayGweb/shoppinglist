var express = require('express');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = function(){
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function(name){
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id){
  var itemCopy = this.items[id] || {};
  var deleteditem = this.items.pop(id);
  return itemCopy;
};

Storage.prototype.put = function(obj){
    this.items[obj.id] = obj;
    return obj;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();

app.use(express.static('public'));

app.get('/items', function(request, response){
    response.json(storage.items);
});

app.post('/items', jsonParser ,function(request, response){
    if(!request.body){
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:number', jsonParser, function(request, response){
    var item = request.params.number;
    var deletedItem = storage.delete(item);
    if(deletedItem.hasOwnProperty('id')){
        response.status(201).json(deletedItem);
    } else {
        response.status(501).json({error: 'Item not found'});
    }
});

app.put('/items/:id', jsonParser, function(request, response){
    var clientJson = request.body;
    console.log(clientJson);
    var result = storage.put(clientJson);
    response.status(200).json(result);
    //response.status(201).json({everythang: 'alright'})
});

app.listen(process.env.PORT, process.env.IP);