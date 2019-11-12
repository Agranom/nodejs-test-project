const LIVR = require('livr');
const dbOld = require('../db-old');
const db = require('../initializers/db');

const itemsController = {
    async getItems(ctx) {
        ctx.body = await db.getItems();
    },
    createItem(ctx) {
        const isAdmin = ctx.headers.authorization === 'admin';

        if (isAdmin) {
            dbOld.writeItem(null, ctx.request.body);
            ctx.status = 201;
        } else {
            ctx.status = 403
        }

    },
    deleteItem(ctx) {
        dbOld.deleteItem(ctx.params.itemId);
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

        const updatedItem = dbOld.updateItem(+ctx.params.itemId, ctx.request.body);

        if (updatedItem) {
            ctx.body = updatedItem;
        } else {
            ctx.status = 404;
        }

    }
};

module.exports = itemsController;
