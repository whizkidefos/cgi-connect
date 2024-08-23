# CGIProject

A CRM - customer relations management system for basic customer activities, contracts, progress updates, analytics.

## Bash script: Run in terminal

Run the following in your terminal, command prompt or shell to generate JWT_SECRET and SESSION_SECRET

```
openssl rand -base64 32

```
After that, create a .env file and populate as such:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/mondo-db-name
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

```

## Frontend

/views

- HTML5 + Bootstrap + Sass + EJS + ES6 + FontAwesome Icons + Google Fonts

## Backend

- Node + Express

## Controllers

/controllers

## Routing

/routes

## DB Connector

/config

## Data Models

/models

## Database

MongoDB

### Setup and Running the app

```
git clone https://github.com/whizkidefos/cgi-connect.git
cd CGIProject
npm install
node seedAdmin.js (to create a demo admin) OR
node seed.js (to create 20 admins, 68 customers, and 134 contracts each radomly attached to a customer)
npm start

```

#### Explanation

- clone the repo to your machine (git clone the-repository-url)
- then do an 'npm install' to install dependencies
- then run: 'npm start' to start the development server on port 5000 or your specified port in your .env file (you should create this at the root of the project); and also starts the sass compiler to watch for file changes
