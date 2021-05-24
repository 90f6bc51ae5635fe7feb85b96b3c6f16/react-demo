import BaseModel from './BaseModel'

export default class UserModel extends BaseModel {
    async checkLogin(data) {
        return this.authFetch({
            url: 'user/checkLogin',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async getUserLastCode(data) {
        return this.authFetch({
            url: 'user/getUserLastCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async getUserBy(data) {
        return this.authFetch({
            url: 'user/getUserBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async getUserByCode(data) {
        return this.authFetch({
            url: 'user/getUserByCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async checkUsernameBy(data) {
        return this.authFetch({
            url: 'user/checkUsernameBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async updateUser(data) {
        return this.authFetch({
            url: 'user/updateUser',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async insertUser(data) {
        return this.authFetch({
            url: 'user/insertUser',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
    async deleteUserByCode(data) {
        return this.authFetch({
            url: 'user/deleteUserByCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}