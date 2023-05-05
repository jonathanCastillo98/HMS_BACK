import 'dotenv/config';
import app from './app';
import { init } from './database/connection';
import './models/associations';
import * as admin from "firebase-admin";
import { initDb } from './database/initDB';
import { updateTables } from './middlewares/updateTables';
import { applicationDefault } from 'firebase-admin/app';
admin.initializeApp({
    credential:applicationDefault()
});

const PORT = process.env.PORT || 3000;

async function main() {
    await init();
    app.listen(PORT, () => {
        console.log('Server running on port:', PORT);
        initDb();
        updateTables();
    });

}

main();
