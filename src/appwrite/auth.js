import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createUser({ email, password, name }) {
        try {
            const newUser = await this.account.create(ID.unique(), email, password, name);
            if (newUser) return this.loginUser(email.password)
            else return newUser;
        } catch (error) {
            throw error;
        }
    }

    async loginUser({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logOut() {
        try {
            await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error :: ", error);
        }
    }

};

const authService = new AuthService();

export default authService;