const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Reemplaza espacios por -
        .replace(/[^\w\-]+/g, '')       // Elimina caracteres no válidos
        .replace(/\-\-+/g, '-')         // Reemplaza múltiples - por uno solo
        .replace(/^-+/, '')             // Elimina - al inicio
        .replace(/-+$/, '');            // Elimina - al final
};

module.exports = slugify;
