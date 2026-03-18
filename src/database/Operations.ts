import { User, UserLocal, UserNew } from '../types/User';
import { getDB } from './index';

const TAG = "OperationsLocalDB :";

export const OperationsLocalDB = {

    async getUsers(limit: number, offset = 0, query?: string) {
        const db = await getDB();

        let sql = `SELECT * FROM users`;
        const params: any[] = [];
        if (query) {
            sql += ` WHERE name LIKE ? OR email LIKE ? OR role LIKE ?`;
            const q = `%${query}%`;
            params.push(q, q, q);
        }

        sql += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const res = await db?.execute(sql, params);
        const rows = res?.rows?._array ?? [];
        return {
            users: rows as UserLocal[],
            newNextToken: rows.length === limit ? offset + limit : 0,
        };
    },

    async getPendingUsers() {
        const db = await getDB();
        const res = await db?.execute('SELECT * FROM users WHERE _synced = 0;');
        const rows = res?.rows?._array ?? [];
        return rows as UserLocal[];
    },

    async insertUser(user: UserNew) {
        const db = await getDB();
        const res = await db?.execute(
            `INSERT INTO users 
        (name, email, role, _synced) 
        VALUES (?, ?, ?, ?);`,
            [user.name, user.email, user.role, user._synced]
        );
        console.log(TAG, "insertUser res :", res);
    },

    async upsertUserFromApi(user: User) {
        const db = await getDB();

        const res = await db?.execute(
            `INSERT INTO users (id, name, email, role, _synced)
            VALUES (?, ?, ?, ?, 1)
            ON CONFLICT(email) DO UPDATE SET
            name = CASE 
                WHEN users._synced = 0 THEN users.name 
                ELSE excluded.name 
            END,
            role = CASE 
                WHEN users._synced = 0 THEN users.role 
                ELSE excluded.role 
            END,
            _synced = CASE 
                WHEN users._synced = 0 THEN 0 
                ELSE 1 
            END`,
            [user.id, user.name, user.email, user.role]
        );

        console.log(TAG, "upsertUserFromApi :", res);
    },

    async insertUsers(users: UserLocal[]) {
        //batch is better, but keep simple for now
        for (const u of users) {
            await this.upsertUserFromApi(u);
        }
    },

    async markSynced(id: string) {
        const db = await getDB();
        await db?.execute(
            'UPDATE users SET _synced = 1 WHERE id = ?;',
            [id]
        );
    },
};