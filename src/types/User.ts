export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export type UserLocal = User & {
    _synced: number; // 0 | 1
};


export type UserNew = Omit<UserLocal, 'id'>;