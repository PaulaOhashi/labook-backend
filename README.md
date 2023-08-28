# Projeto Labook

# Sobre o Projeto

Projeto de back-end do curso de desenvolvedor web full stack da Labenu. Trata-se de uma API de uma rede social que tem por objetivo promover a conexão e a interação entre as pessoas. É possível realizar o cadastro de novos usuários, fazer o login, criar e deletar postagens e curtir e descurtir publicações.  

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento

## Endpoints implementados
- Signup
- Login
- Create post
- Get Posts
- Edit post
- Delete post
- like / dislike post

## Exemplos de Requisição
### POST /users/signup
Cadastra um novo usuário e tem como resposta um token
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0NGFhNjUwLWEwZTUtNGY0Ni1hMTEwLTU1ZDFlNTI5NzU3NiIsIm5hbWUiOiJCZWx0cmFuYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMxODk1NDgsImV4cCI6MTY5Mzc5NDM0OH0.cI8kjnEiaiI7QGgXRbFts75KTpGM_fBVMgh5_ZmLxiA"
}
```

### GET /users/login
Entra na conta cadastrada e tem como resposta um token
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0NGFhNjUwLWEwZTUtNGY0Ni1hMTEwLTU1ZDFlNTI5NzU3NiIsIm5hbWUiOiJCZWx0cmFuYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMxODk3MjgsImV4cCI6MTY5Mzc5NDUyOH0.JZdvpUmeyoXBjyuEAKMkmvbc1mDKTcusN5O6l08nVYo"
}
```

### POST /posts
Cria uma postagem
```
{
    "content": "Bom dia"
}
```
### GET /posts
Exibe as postagens
```
[
    {
        "id": "1656251e-7806-4388-b26f-ed7b6d73b2c0",
        "content": "kkkkkkkrying",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T06:01:02.747Z",
        "updatedAt": "2023-08-28T06:01:02.747Z",
        "creator": {
            "id": "044aa650-a0e5-4f46-a110-55d1e5297576",
            "name": "Beltrana"
        }
    },
    {
        "id": "7d6e16f1-ab49-4202-af4e-608491585e2d",
        "content": "Bom diaaaa",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T07:45:44.552Z",
        "updatedAt": "2023-08-28T07:45:44.552Z",
        "creator": {
            "id": "044aa650-a0e5-4f46-a110-55d1e5297576",
            "name": "Beltrana"
        }
    }
]
```

### PUT /posts/:id
Edita uma postagem
```
{
    "content": "Boa noite"
}
```

### DELETE /posts/:id
```
Retorna Status code 200 ok
```

### PUT /posts/:id/like
Adiciona ou remove o número de likes
```
Retorna Status code 200 ok
```

## Link para a coleção de requisições no Postman
https://documenter.getpostman.com/view/26594526/2s9Y5ZuM5U

## Autores
[<img src="https://github.com/PaulaOhashi/labecommerce-backend/assets/107084846/d9ecbcb0-07da-44e1-a511-60f604e9d1bb" width=115><br><sub>Paula Iumi Ohashi</sub>](https://github.com/PaulaOhashi)
