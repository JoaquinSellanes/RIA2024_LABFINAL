const filterProductProperties = (producto) => {
    const { isDeleted, isActive, ...filteredProduct } = producto;
    return filteredProduct;
};

module.exports = filterProductProperties;
