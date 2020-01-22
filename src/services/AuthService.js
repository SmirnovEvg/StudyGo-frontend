export default class AuthService {
    static getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    static getToken() {
        return localStorage.getItem("access_token");
    }

    static setTokenUser(token, user) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static removeTokenUser() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }
}