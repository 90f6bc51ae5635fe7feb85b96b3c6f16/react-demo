import BaseModel from './BaseModel'

export default class FarmModel extends BaseModel {
 
    async getFarmBy(data) {
        return this.authFetch({
            url: 'fram/getFarmBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // async getUserByCode(data) {
    //     return this.authFetch({
    //         url: 'user/getUserByCode',
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    // }

    // async checkUsernameBy(data) {
    //     return this.authFetch({
    //         url: 'user/checkUsernameBy',
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    // }

    // async updateUserBy(data) {
    //     return this.authFetch({
    //         url: 'user/updateUserBy',
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    // }

    // async insertUser(data) {
    //     return this.authFetch({
    //         url: 'user/insertUser',
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    // }

    // async deleteUserByCode(data) {
    //     return this.deleteUserByCode({
    //         url: 'user/deleteUserByCode',
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //     })
    // }
}