const connectionParams = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'information_schema',
    multipleStatements: true,
    supportBigNumbers: true
};

const databaseDesc = {
    name: 'futbase',
    tables: ['users', 'favouritePlayers']
};

const queries = {
    showTables: 'SELECT TABLE_NAME FROM TABLES WHERE TABLE_SCHEMA = \'' + databaseDesc.name + '\'; ',
    alterRootUser: 'ALTER USER \'root\' IDENTIFIED WITH mysql_native_password BY \'root\'; FLUSH PRIVILEGES; ',
    createDatabase: 'CREATE DATABASE IF NOT EXISTS ' + databaseDesc.name + '; ',
    dropDatabase: 'DROP DATABASE IF EXISTS ' + databaseDesc.name + '; ',
    useDatabase: 'USE ' + databaseDesc.name + '; ',
    createUsersTable: 'CREATE TABLE IF NOT EXISTS ' + (databaseDesc.tables)[0] + ' (' +
        'username VARCHAR(30) NOT NULL, ' +
        'name VARCHAR(30) NOT NULL, ' +
        'lastName VARCHAR(30) NULL DEFAULT NULL, ' +
        'email VARCHAR(40) NOT NULL, ' +
        'password VARCHAR(30) NOT NULL, ' +
        'PRIMARY KEY (username)); ',
    createFavouritePlayersTable: 'CREATE TABLE IF NOT EXISTS ' + (databaseDesc.tables)[1] + ' (' +
            'username VARCHAR(30) NOT NULL, ' +
            'playerId MEDIUMINT NOT NULL, ' +
            'PRIMARY KEY (username, playerId), ' +
            'CONSTRAINT fk_favouritePlayers_user ' +
            'FOREIGN KEY (username)' +
            'REFERENCES users (username)); ',
    insertAdminUser: 'INSERT INTO ' + databaseDesc.tables[0] + ' VALUES (\'admin\', \'Futbase\', \'Admin\', \'admin@futbase.com\', \'adminadmin\') ON DUPLICATE KEY UPDATE username = \'admin\'; '
};

const mysqlSetup = {
    connectionParams: connectionParams,
    databaseDesc: databaseDesc,
    queries: queries
};

export default mysqlSetup;
