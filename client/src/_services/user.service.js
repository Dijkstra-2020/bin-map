import { authHeader } from '../_helpers/auth-header';

export const userService = {
    login,
    signin,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    const data = fetch("http://" + window.location.hostname +":9000/users/login", requestOptions)
        .then(handleResponse);
          if (data) {
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            data.authdata = window.btoa(data.email + ':' + data.password);
            localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function signin(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const data = fetch("http://" + window.location.hostname + ":9000/users/signin", requestOptions)
        .then(handleResponse);
    if (data) {
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            data.authdata = window.btoa(data.email + ':' + data.password);
            localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch("http://" + window.location.hostname + ":9000/users/", requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}