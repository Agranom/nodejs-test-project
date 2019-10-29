const itemsController = require('./controllers/items');

const initRoutes = (router) => {
    router.get('/', (ctx) => {
        ctx.body = 'Hello World';
    });

    router.get('/items', itemsController.getItems);
    router.post('/items', itemsController.createItem);
    router.put('/items/:itemId', itemsController.updateItem);
    router.delete('/items/:itemId', itemsController.deleteItem);
};

module.exports = initRoutes;
