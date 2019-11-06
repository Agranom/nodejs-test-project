let items = [
    {
        id: 1,
        price: 100,
        name: 'Coca Cola'
    },
    {
        id: 2,
        price: 200,
        name: 'Sprite'
    }
];

const writeItem = (data) => {
    const latestId = items[items.length - 1].id + 1;
    items.push({
        ...data,
        id: latestId
    });
};
const getItems = () => {
    return items;
};

const deleteItem = (id) => {
    items = items.filter(i => i.id !== id);
};

const updateItem = (id, data) => {
    let updatedItem = null;

    items = items.map(i => {
        if (i.id === id) {
            updatedItem = {
                id,
                ...data
            };
            return updatedItem;
        }
        return i;
    });

    return updatedItem;
};


module.exports = {
    writeItem,
    getItems,
    deleteItem,
    updateItem
};
