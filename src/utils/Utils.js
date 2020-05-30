
// Converting an Array to Object indexed by primary key
export function indexArrayByKey (array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item
        };
    }, initialValue);
};

// Converting an Array to Object grouped by a key
export function groupArrayByKey (array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: 
                obj.hasOwnProperty(item[key]) ? [...obj[item[key]], item] : [item]
            
        };
    }, initialValue);
};