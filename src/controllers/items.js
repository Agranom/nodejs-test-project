const LIVR = require('livr');
const db = require('../db-old');

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
        const validator = new LIVR.Validator({
            itemId: ['required', 'positive_integer']
        });

        const validData = validator.validate({
            itemId: ctx.params.itemId
        });

        if (!validData) {
            ctx.body = validator.getErrors();
            ctx.statusCode = 400;
            return;
        }

        const updatedItem = db.updateItem(+ctx.params.itemId, ctx.request.body);

        if (updatedItem) {
            ctx.body = updatedItem;
        } else {
            ctx.status = 404;
        }

    }
};

module.exports = itemsController;
