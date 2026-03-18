import { User } from './user';

export type ListUsersResponse = {
  listZellerCustomers: {
    items: User[];
    nextToken: number ;
  };
};