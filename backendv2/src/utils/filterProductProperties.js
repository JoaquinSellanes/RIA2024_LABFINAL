const filterProductProperties = (producto) => {
    const { isDeleted, ...filteredProduct } = producto;
    return filteredProduct;
};

module.exports = filterProductProperties;
