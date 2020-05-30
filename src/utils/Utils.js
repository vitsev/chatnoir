
// Converting an Array to Object by a given key
export function convertArrayToObject (array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};