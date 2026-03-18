import { create } from "zustand";
import client from "../network/index";
import { LIST_USERS } from "../network/Queries";
import { User } from "../types/User";
import { ListUsersResponse } from "../types/GraphQL";
import { Repository } from "../repository";

const TAG = "Store :"

type UsersState = {
    users: User[],
    nextToken: number,
    loading: boolean,
    query: string,
    setQuery: (q:string) => void,
    load: () => Promise<void>,
};


export const usersStore = create<UsersState>((set, get) => (
    {
        users: [],
        nextToken: 0,
        loading: false,
        query: '',
        setQuery: (q: string) => {
            console.debug(TAG,"Searched :",q);
            
            set({ query: q, nextToken: 0, users: [] });
            get().load(); // reload from start
        },
        load: async () => {
            try {
                set({ loading: true });
                const { nextToken, query } = get();
                // const res = await client.request<ListUsersResponse>(LIST_USERS, { limit: 2, nextToken: nextToken })
                const { users, newNextToken } = await Repository.getUsers(2, nextToken ?? 0, query);
                console.log(TAG,"load newNextToken:",newNextToken)
                set(state => ({
                    users: nextToken ? [...state.users, ...users] : users,
                    nextToken: newNextToken,
                    loading: false,
                }));
            } catch (error) {
                set({ loading: false });
                console.error(TAG, "Error loadUsers :", error);
            }
        }
    }
));

