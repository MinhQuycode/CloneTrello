// Sắp xếp mảng này theo mảng khác.
export const mapOrder = (arr, order, key) => {
    arr.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return arr;
};