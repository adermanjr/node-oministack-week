module.exports = function parseStringAsArray(stringasArray) {
 return stringasArray.split(',').map(st => st.trim());
}