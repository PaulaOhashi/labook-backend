-- Active: 1691904603195@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users (id, name, email, password, role, created_at)
VALUES
	('u002', 'Ciclano', 'ciclano@email.com', 'ciclano123',"ADMIN","hj");
	
INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES 
    ('p001','u001','Bom dia','5','1','hoje','hoje');

DROP TABLE users;

DROP TABLE posts;

DROP TABLE likes_dislikes;