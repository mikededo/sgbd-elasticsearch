export const connectionParams = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'information_schema',
    multipleStatements: true,
    supportBigNumbers: true
};

export const database = {
    name: 'futbase',
    tables: ['users', 'favouritePlayers']
};

export const queries = {
    showTables: [
        'SELECT TABLE_NAME FROM TABLES WHERE TABLE_SCHEMA = "',
        database.name,
        '";'
    ].join(''),
    createDatabase: `CREATE DATABASE IF NOT EXISTS ${database.name};`,
    dropDatabase: `DROP DATABASE IF EXISTS ${database.name};`,
    useDatabase: `USE ${database.name}; `,
    createUsersTable: [
        'CREATE TABLE IF NOT EXISTS ',
        database.tables[0],
        ' (',
        'id MEDIUMINT NOT NULL AUTO_INCREMENT,',
        'name VARCHAR(30) NOT NULL,',
        'lastName VARCHAR(30) NULL DEFAULT NULL,',
        'email VARCHAR(40) NOT NULL,',
        'password VARCHAR(255) NOT NULL,',
        'PRIMARY KEY (id));'
    ].join(' '),
    createUsersIndex: `CREATE UNIQUE INDEX user_email ON ${database.tables[0]} (email);`,
    createFavouritePlayersTable: [
        'CREATE TABLE IF NOT EXISTS',
        database.tables[1],
        '(',
        'userId MEDIUMINT NOT NULL,',
        'playerId MEDIUMINT NOT NULL,',
        'PRIMARY KEY (userId, playerId),',
        'CONSTRAINT fk_favouritePlayers_user',
        'FOREIGN KEY (userId)',
        'REFERENCES users (id));'
    ].join(' ')
};
