
export function getAllUsers(){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch(process.env.REACT_APP_SERVER_URL + '/api/users', requestOptions)
    .then(handleResponse);
}

export function getAllTopics(userID){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch(process.env.REACT_APP_SERVER_URL + '/api/users/' + userID + '/topics', requestOptions)
    .then(handleResponse);
}

export function getAllMessages(userID){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    return fetch(process.env.REACT_APP_SERVER_URL + '/api/users/' + userID + '/messages', requestOptions)
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