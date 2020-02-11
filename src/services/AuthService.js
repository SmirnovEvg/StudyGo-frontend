import CryptoJS from 'crypto-js';
export default class AuthService {
    static getUser() {
        return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user").toString(), 'key').toString(CryptoJS.enc.Utf8));
    }

    static getToken() {
        return localStorage.getItem("access_token");
    }

    static setTokenUser(token, user) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(user), 'key'));
    }

    static removeTokenUser() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }
}