import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ Title, Slug, Content, Featured_Image, Status, User_ID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    Title,
                    Slug,
                    Content,
                    Featured_Image,
                    Status,
                    User_ID,
                }
            )
        } catch (error) {
            console.error("Appwrite :: Create Post :: Error :: ", error);
        }
    }

    async updatePost(Document_ID, { Title, Slug, Content, Featured_Image, Status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Document_ID,
                {
                    Title,
                    Slug,
                    Content,
                    Featured_Image,
                    Status
                }
            )
        } catch (error) {
            console.error("Appwrite :: Update Post :: Error :: ", error);

        }
    }

    async deleteDocument(Document_ID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Document_ID
            )
            return true;
        } catch (error) {
            console.error("Appwrite :: Delete Post :: Error :: ", error);
            return false;
        }
    }

    async getPost(Document_ID) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Document_ID
            )
        } catch (error) {
            console.error("Appwrite :: Get Post :: Error :: ", error);
        }
    }

    async getAllActivePosts(queries = [Query.equal("Status", ["active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )

        } catch (error) {
            console.error("Appwrite :: Get Active Post :: Error :: ", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Appwrite :: Upload File :: Error :: ", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.error("Appwrite :: Delete File :: Error :: ", error);
            return false;
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFile(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const service = new Service();

export default service;