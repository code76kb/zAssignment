import { OperationsLocalDB } from "../database/Operations";
import client from "../network";
import { LIST_USERS } from "../network/Queries";
import { ListUsersResponse } from "../types/GraphQL";
import { User, UserLocal, UserNew } from "../types/User";

const TAG = "Repository :";

async function getUsers(limit: number = 2, nextToken: number, query?: string) {
    //Local-DB check
    const local = await OperationsLocalDB.getUsers(limit, nextToken, query);
    console.log(TAG, "getUSers At LocalLen :", local.users.length);
    if (local.users.length) {
        console.log(TAG, "getUSers At Local :", local);
        return { users: local.users, newNextToken: local.newNextToken };
    }

    console.log(TAG, "getUSers Invoking Api ...");

    //Api
    const res = await client.request<ListUsersResponse>(LIST_USERS, { limit: limit, nextToken: `${nextToken}` });
    console.log(TAG, "getUsers API Response :", res);

    const users = res.listZellerCustomers.items;
    const newNextToken = res.listZellerCustomers.nextToken;

    //Save to local
    await OperationsLocalDB.insertUsers(
        users.map(u => ({ ...u, _synced: 1 }))
    );

    //GEt From Local-DB 
    const local_ = await OperationsLocalDB.getUsers(limit, nextToken, query);
    console.log(TAG, "getUSers At Re-fetch LocalLen :", local_.users.length);
    return { users: local_.users, newNextToken: local_.newNextToken };

}

async function addNewUser(user: UserNew) {
    try {
        await OperationsLocalDB.insertUser(user);
        return true;
    }
    catch (error) {
        return false;
        console.error(TAG, "Error addNewUser :", error);
    }
}

async function  updateUser(user:UserLocal) {
    
}


export const Repository = {
    getUsers,
    addNewUser
}