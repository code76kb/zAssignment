import { UserNew, UserLocal, User } from '../../types/User';

export const Repository = {
  getUsers: jest.fn(async (limit = 2, nextToken?: number, query?: string) => {
    // Return dummy users
    return {
      users: [
        { id: 1, name: 'John Doe', email: 'john@test.com', role: 'Admin', _synced: 1 } as UserLocal,
        { id: 2, name: 'Jane Doe', email: 'jane@test.com', role: 'Manager', _synced: 1 } as UserLocal,
      ].slice(0, limit),
      newNextToken: nextToken ? nextToken + 1 : 1,
    };
  }),

  addNewUser: jest.fn(async (user: UserNew) => {
    return true; // simulate success
  }),

  updateUser: jest.fn(async (user: UserLocal) => {
    return true; // simulate success
  }),
};