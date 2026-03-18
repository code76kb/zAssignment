import { getDB } from ".";
const TAG = "Migration :";
export const initDB = async () => {
    try {
        const db = await getDB();
        //Temp : Clean-up
        // await db?.executeAsync(`DROP TABLE users`);

        //run migration
        const result = await db?.executeAsync(
            `CREATE TABLE IF NOT EXISTS users
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        email TEXT UNIQUE NOT NULL, 
        role TEXT,
        _synced INTEGER
        )`
        );
        console.log(TAG, "intDB Result :", result);
        const idx = await db?.executeAsync("PRAGMA index_list(users);");
        console.log(idx);

    }
    catch (error) {
        console.error(TAG, "Error initDB :", error);
    }
}