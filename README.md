## Ensolvers Challenge

- Author: Daniel Vargas Cano <daniel.vargas3128@hotmail.com>
- Project Purpose: Implementing a simple web application that allows the user to take notes, tag and filter them

## Technologies to use:

Backend:
- Java version: ^17.0.1
- Gradle version: ^7.5
- Spring Boot version: ^2.7.3

Database:
- MySQL version: ^8.0.29 MySQL Community Server
- MySQL Workbench version: ^8.0.29 (See instructions below)

Frontend:
- Node version: 16.16.0
- React version: ^18.2.0

## Instructions:

Database:
- To configure the database, install the indicated technologies in your local machine, create a new connection and 
set it up like this
    - Connection Name: (Name of your preference)
    - Connection Method: Standard (TCP/IP)
    - Hostname: 127.0.0.1 (localhost)
    - Port: 3306
    - Username: root
    - Password: 1234
- Create a new schema in the connected server with the attributes:
    - Name: db_notes
    - Charset: utf8mb4
    - Collation: utf8mb4_unicode_ci (or similar)

Backend:

- Install the indicated technologies in your local machine, check if your Java Home and Java path are correctly
configured in the environment variables, you can also configure the Gradle Home and Gradle path there.
- Run NotesBackendApplication.java in "backend/src/main/java/com/danielvargas/notesbackend"

Frontend:

- Install the indicated technologies in your local machine, run command: "npm install", to install the necessary
packages for running the app.
- Run command: "npm start", and the app will be shown in a window of the browser

## Aplication Login

You can access the app with any email and password you type

If you have any questions, please contact me.