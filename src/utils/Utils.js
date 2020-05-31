
// Converting Array to Object indexed by primary key
export function indexArrayByKey (array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item
        };
    }, initialValue);
};

// Converting Array to Object grouped by some key
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

export const USER1_IMAGE_PATH = '/static/images/oleg.jpg'
export const USER2_IMAGE_PATH = '/static/images/svetlana.png'
// Adding hardcoded image path to User object properties
export function addAvatarToUsers (allUsers) {
    allUsers[1].avatarPath = USER1_IMAGE_PATH;
    allUsers[2].avatarPath = USER2_IMAGE_PATH;

    return allUsers;
}