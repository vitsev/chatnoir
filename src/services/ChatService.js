
export function getAllUsers(){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch('http://localhost:3001/api/users', requestOptions)
    .then(handleResponse);
}

export function getAllTopics(userID){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch('http://localhost:3001/api/users/' + userID + '/topics', requestOptions)
    .then(handleResponse);
}

export function getAllMessages(userID){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch('http://localhost:3001/api/users/' + userID + '/messages', requestOptions)
    .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}