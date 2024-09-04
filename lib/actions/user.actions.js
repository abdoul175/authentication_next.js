'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";

export const Login = async ({ email, password }) => {
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password)


        cookies().set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })

        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        console.error('Error:', error);
    }
}

export const Register = async (userData) => {
    const { username, email, password } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, username)

        const session = await account.createEmailPasswordSession(email, password)


        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })

        return JSON.parse(JSON.stringify(newUserAccount));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        console.error('Error:', error);
    }
}

export const logout = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session')
        await account.deleteSession('current')
    } catch (error) {
        return null
    }
}

export const resetPassword = async (email, url) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createRecovery(email, url);
        return JSON.parse(JSON.stringify(response))
    } catch (error) {
        console.error('Error:', error);
    }
}

export const changeAccountPassword = async (data) => {
    const { userId, secret, confirmPassword } = data;
    try {
        const { account } = await createAdminClient();
        const response = await account.updateRecovery(userId, secret, confirmPassword);
        return JSON.parse(JSON.stringify(response))
    } catch (error) {
        console.error('Error:', error);
    }
}

export const accountVerification = async (url) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createVerification(url);
        return JSON.parse(JSON.stringify(response))
    } catch (error) {
        console.error('Error:', error);
    }
}