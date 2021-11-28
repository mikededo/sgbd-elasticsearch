import Client from 'mysql';

import { connectionParams, database, queries } from './constants';

const connection = Client.createConnection(connectionParams);

const createDatabase = () =>
    connection.query(
        [
            queries.createDatabase,
            queries.useDatabase,
            queries.createUsersTable,
            queries.createUsersIndex,
            queries.createFavouritePlayersTable,
            queries.insertAdminUser
        ].join(''),
        (err) => {
            if (err) {
                throw err;
            }

            console.log(
                `[MYSQL] ℹ️ Database ${database.name} created successfully`
            );
        }
    );

const checkDatabase = () =>
    new Promise((resolve, reject) =>
        connection.query(queries.showTables, (err, result) => {
            if (err) {
                reject(err);
            } else if (
                result.length !== 2 ||
                result.every((x, i) => x.TABLE_NAME === database.tables[i])
            ) {
                console.log(
                    `[MYSQL] 🔴 Database ${database.name} format is not correct`
                );
                resolve(false);
            } else {
                console.log(
                    `[MYSQL] ℹ️  Database ${database.name} checked successfully`
                );
                resolve(true);
            }
        })
    );

const dropAndCreateDatabase = () =>
    connection.query(
        [
            queries.dropDatabase,
            queries.createDatabase,
            queries.useDatabase,
            queries.createUsersTable,
            queries.createUsersIndex,
            queries.createFavouritePlayersTable,
            queries.insertAdminUser
        ].join(''),
        (err) => {
            if (err) {
                throw err;
            }

            console.log(
                `[MYSQL] ℹ️  Database ${database.name} dropped and created successfully`
            );
        }
    );

const selectDatabaseAndInsertAdminUser = () =>
    connection.query(queries.useDatabase, (err) => {
        if (err) {
            throw err;
        }

        console.log(`[MYSQL] ℹ️  Database ${database.name} selected`);
    });

const getSchema = () =>
    new Promise((resolve, reject) =>
        connection.query(
            'SELECT schema_name FROM SCHEMATA WHERE schema_name = ?',
            database.name,
            (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            }
        )
    );

const initialize = () => {
    try {
        connection.connect((err) => {
            if (err) {
                throw err;
            }

            console.log('[MYSQL] 🟢 Connection to MySQL database established');
        });

        return getSchema()
            .then((schemas) => {
                if (schemas.length !== 1) {
                    createDatabase();
                } else {
                    checkDatabase().then((check) => {
                        if (!check) {
                            dropAndCreateDatabase();
                        } else {
                            selectDatabaseAndInsertAdminUser();
                        }
                    });
                }
            })
            .catch((err) => {
                throw err;
            });
    } catch ({ message: msg }) {
        console.error('[MYSQL] 🔴 ', msg);
    }
};

export default connection;
export { initialize };
