# Desafio Técnico - Fullstack

## Objetivo

O objetivo deste desafio é avaliar seus conhecimentos técnicos em desenvolvimento web fullstack.

## Linguagens e frameworks

ReeactJS, Laravel, MySQL, NextJS, Typescript

## Rodando o projeto

### Requisitos

- [Node.js](https://nodejs.org/en/) >= 18.16.0
- [Yarn](https://classic.yarnpkg.com/)
- [PHP](https://www.php.net/) >= 8.2
- [Laravel](https://laravel.com/docs) >= 10
- [MySQL](https://www.mysql.com/) >= 8.1.0

### Instalação

```bash
$ git clone [url-do-repositorio]
$ cd server && composer install
```

Inserir no .env as configurações do banco de dados
DB_CONNECTION=mysql
DB_HOST={HOST}
DB_PORT={PORT}
DB_DATABASE={SHEMA}
DB_USERNAME={USER}
DB_PASSWORD={PASSWORD}

Após configurar o banco de dados, rodar o comando para criar as tabelas

```bash
$ php artisan migrate
$ php artisan db:seed
```

Na pasta client, rodar o comando

```bash
$ cd ../client && yarn install

```

### Rodando o projeto

Em terminais separados, rodar os comandos:

```bash
$ cd ../server && php artisan serve
$ cd ../client && yarn start
```

Usuário para login

- Client

  - email: client@example.com
  - senha: 123

- Admin
  - email: test@example.com
  - senha: 12345
