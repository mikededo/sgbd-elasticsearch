-- AQUEST FITXER NOMÉS ÉS NECESSARI SI VOLEU CARREGAR LES DADES MANUALMENT A MYSQL

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS futbase;
USE futbase;

CREATE TABLE IF NOT EXISTS users (
	id MEDIUMINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NULL DEFAULT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX user_email ON users (email); 

CREATE TABLE IF NOT EXISTS favouritePlayers (
	userId MEDIUMINT NOT NULL,
    playerId MEDIUMINT NOT NULL,
    PRIMARY KEY (userId, playerId),
    CONSTRAINT fk_favouritePlayers_user
		FOREIGN KEY (userId)
        REFERENCES users (id)
);

INSERT INTO users (name, lastName, email, password)
VALUES (
    'Futbase',
    'Admin',
    'admin@futbase.com',
    '$2b$10$QT6YYUa8Vis5SlQ3WsylTuobqQ9o0Q87KC8oHUCLdMTc5QzuCtgyW'
) ON DUPLICATE KEY UPDATE;
