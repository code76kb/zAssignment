
import { NitroSQLiteConnection, open } from 'react-native-nitro-sqlite'
const TAG = "DataBase:";


let db: NitroSQLiteConnection | null = null;

export const getDB = async () => {
    try {
        if (db)
            return db;
        db = open({ name: "zApp.sqlite" });
        return db;
    }
    catch (error) {
        console.error(TAG,"Error getDB :",error);
    }
}


