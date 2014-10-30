function randomMax8HexChars() {
    return (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
}
function generateRandomId() {
    return randomMax8HexChars() + randomMax8HexChars();
}