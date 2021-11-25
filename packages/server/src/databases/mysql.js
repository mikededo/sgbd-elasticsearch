import Client from 'mysql';
import mysqlSetup from './mysqlSetup';

const MysqlCon = Client.createConnection(mysqlSetup.connectionParams);

const createDatabase = () =>
    MysqlCon.query(
        mysqlSetup.queries.alterRootUser +
            mysqlSetup.queries.createDatabase +
            mysqlSetup.queries.useDatabase +
            mysqlSetup.queries.createUsersTable +
            mysqlSetup.queries.createFavouritePlayersTable +
            mysqlSetup.queries.insertAdminUser,
        (err) => {
            if (err) throw err;
            console.log(
                `[MYSQL] Database ${mysqlSetup.databaseDesc.name} created successfully`
            );
        }
    );

const checkDatabase = () =>
    new Promise((resolve, reject) =>
        MysqlCon.query(mysqlSetup.queries.showTables, (err, result) => {
            if (err) reject(err);
            else if (
                result.length !== 2 ||
                result.every(
                    (x, i) => x.TABLE_NAME === mysqlSetup.databaseDesc.tables[i]
                )
            ) {
                console.log(
                    `[MYSQL] Database ${mysqlSetup.databaseDesc.name} format is not correct`
                );
                resolve(false);
            } else {
                console.log(
                    `[MYSQL] Database ${mysqlSetup.databaseDesc.name} checked successfully`
                );
                resolve(true);
            }
        })
    );

const dropAndCreateDatabase = () =>
    MysqlCon.query(
        mysqlSetup.queries.dropDatabase +
            mysqlSetup.queries.alterRootUser +
            mysqlSetup.queries.createDatabase +
            mysqlSetup.queries.useDatabase +
            mysqlSetup.queries.createUsersTable +
            mysqlSetup.queries.createFavouritePlayersTable +
            mysqlSetup.queries.insertAdminUser,
        (err) => {
            if (err) throw err;
            console.log(
                '[MYSQL] Database',
                mysqlSetup.databaseDesc.name,
                'dropped and created successfully'
            );
        }
    );

const selectDatabaseAndInsertAdminUser = () =>
    MysqlCon.query(
        mysqlSetup.queries.useDatabase + mysqlSetup.queries.insertAdminUser,
        (err) => {
            if (err) throw err;
            console.log(
                `[MYSQL] Database ${mysqlSetup.databaseDesc.name} selected`
            );
        }
    );

const getSchema = () =>
    new Promise((resolve, reject) =>
        MysqlCon.query(
            'SELECT schema_name FROM SCHEMATA WHERE schema_name = ?',
            mysqlSetup.databaseDesc.name,
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        )
    );

const initialize = async () => {
    try {
        MysqlCon.connect((err) => {
            if (err) throw err;
            console.log('[MYSQL] Connection to MySQL database established');
        });

        getSchema()
            .then(async (schemas) => {
                if (schemas.length !== 1) await createDatabase();
                else {
                    checkDatabase().then(async (check) => {
                        if (!check) await dropAndCreateDatabase();
                        else await selectDatabaseAndInsertAdminUser();
                    });
                }
            })
            .catch((err) => {
                throw err;
            });
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
    }
};

initialize();

export default MysqlCon;
