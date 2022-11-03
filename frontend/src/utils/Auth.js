class Auth {
    constructor(options) {
        this.url = options.url; 
    }

    _handleResponse(res) {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
    }

    register(email, password) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })
        .then(this._handleResponse)
    }

    authorize(email, password) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })
        .then(this._handleResponse)
    }

    getToken(token) {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(this._handleResponse)
    }
}

export const auth = new Auth({
    url: 'http://localhost:3010',
})
