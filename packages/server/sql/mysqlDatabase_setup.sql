-- AQUEST FITXER NOMÉS ÉS NECESSARI SI VOLEU CARREGAR LES DADES MANUALMENT A MYSQL

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS futbase;
USE futbase;

CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NULL DEFAULT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS favouritePlayers (
	username VARCHAR(30) NOT NULL,
    playerId MEDIUMINT NOT NULL,
    PRIMARY KEY (username, playerId),
    CONSTRAINT fk_favouritePlayers_user
		FOREIGN KEY (username)
        REFERENCES users (username)
);

INSERT INTO users VALUES ('admin', 'Futbase', 'Admin', 'admin@futbase.com', 'adminadmin') ON DUPLICATE KEY UPDATE username = 'admin';
