const db = require('../db');

const itemsController = {
    getItems(ctx) {
        ctx.body = db.getItems();
    },
    createItem(ctx) {
        const isAdmin = ctx.headers.authorization === 'admin';

        if (isAdmin) {
            db.writeItem(null, ctx.request.body);
            ctx.status = 201;
        } else {
            ctx.status = 403
        }

    },
    deleteItem(ctx) {
        db.deleteItem(ctx.params.itemId);
        ctx.statusCode = 204;
        ctx.body = 'Ok'
    },
    updateItem(ctx) {
        const updatedItem = db.updateItem(+ctx.params.itemId, ctx.request.body);

        if (updatedItem) {
            ctx.body = updatedItem;
        } else {
            ctx.status = 404;
        }

    }
};

module.exports = itemsController;
