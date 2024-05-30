let orders = [];
let orderIdCounter = 1;

const calculateTotalCost = (products) => {
    return products.reduce((total, product) => total + product.totalCost, 0);
};

exports.getOrders = (req, res) => {
    res.json(orders);
};

exports.getOrderById = (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id == id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
    }
};

exports.createOrder = (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Datos del pedido inválidos' });
    }

    products.forEach(product => {
        product.totalCost = product.quantity * product.unitCost;
    });

    const newOrder = {
        id: orderIdCounter++,
        userId,
        products,
        totalCost: calculateTotalCost(products)
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
};

exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const { userId, products } = req.body;

    const order = orders.find(o => o.id == id);

    if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Datos del pedido inválidos' });
    }

    products.forEach(product => {
        product.totalCost = product.quantity * product.unitCost;
    });

    order.userId = userId;
    order.products = products;
    order.totalCost = calculateTotalCost(products);

    res.json(order);
};

exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.id == id);

    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const deletedOrder = orders.splice(orderIndex, 1);
    res.json(deletedOrder);
};
