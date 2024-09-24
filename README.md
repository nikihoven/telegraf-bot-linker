
# Telegram Link Manager Bot

This project is a **Telegram bot** built with **NestJS**, **Telegraf**, and **Prisma**, designed to manage user links. It allows users to save links, retrieve them by unique code, list all saved links, and delete links.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **Telegraf**: A Telegram bot framework for Node.js.
- **Prisma**: An ORM (Object-Relational Mapping) that simplifies database access for PostgreSQL.
- **PostgreSQL**: The database used for storing user and link information.
- **Docker & Docker Compose**: For containerized development and deployment.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikihoven/telegraf-bot-linker
   cd telegram-link-manager-bot
   ```

2. **Copy `.env.example` to `.env`**:
   Copy the example environment file and replace `YOUR_BOT_TOKEN` with your actual Telegram bot token:
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env`**:
   Open `.env` and change telegram bot token:
   ```bash
   BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
   ```

4. **Run the application**:
   Use Docker Compose to build and run the application:
   ```bash
   docker-compose up --build -d
   ```

5. **Migrate the database**:
   Once the application is up, apply the database migrations:
   ```bash
   docker-compose exec bot npx prisma migrate deploy
   ```

### Accessing the Bot

- Open Telegram and find your bot by its username (configured when you created the bot).
- Start interacting with the bot using the available commands listed below.

## Available Bot Commands

Here are the available commands that users can execute:

1. **/start**
    - **Description**: Initializes the bot and welcomes the user. Automatically creates a user in the database if it doesn't exist.

    - Example:
       ```
       /start
       ```

2. **/savelink <name> <url>**
    - **Description**: Saves a link with a name and URL. The bot generates a unique code for the link.
    - **Example**:
      ```
      /savelink MyWebsite https://mywebsite.com
      ```
    - **Response**: The bot replies with the unique code for the saved link.


3. **/mylinks**
    - **Description**: Lists all links saved by the user along with their unique codes.
    - **Example**:
      ```
      /mylinks
      ```
    - **Response**: A list of saved links with their codes.
   

4. **/deletelink \<code>**
    - **Description**: Deletes a link by its unique code.
    - **Example**:
      ```
      /deletelink abc12345
      ```
    - **Response**: Confirms the deletion of the link.

5. **/getlink \<code>**
    - **Description**: Retrieves a link by its unique code.
    - **Example**:
      ```
      /getlink abc12345
      ```
    - **Response**: The bot replies with the URL of the saved link.

## Project Structure

- **src/**: Contains the application source code.
    - **bot/**: Contains the bot service and module.
        - `bot.module.ts`: Defines the bot's module and imports.
        - `bot.service.ts`: Contains the logic for bot commands.
    - **common/**: Shared utilities and logic.
        - **exceptions/**: Custom exceptions used across the application.
            - `chat-bot.exception.ts`: Defines bot-related exception handling.
        - **guards/**: Guards for validating requests.
            - `user-existence.guard.ts`: Guard to check and create user if they do not exist.
        - **interfaces/**: Common interfaces.
            - `context.interface.ts`: Interface for defining the Telegram context.
        - **pipes/**: Pipes for transforming and validating data.
            - `message-transform.pipe.ts`: Handles transformation of incoming messages.
    - **prisma/**: Prisma ORM configuration.
        - `prisma.module.ts`: Prisma module definition.
        - `prisma.service.ts`: Contains logic for database interaction using Prisma.
    - `app.module.ts`: Main application module that imports all necessary modules.
    - `main.ts`: Application entry point.

- **prisma/**: Directory containing the Prisma schema and migrations.

- **.env.example**: Example environment variables configuration.

- **docker-compose.yml**: Defines services for the application and PostgreSQL database.

- **dev.Dockerfile**: Dockerfile used for development builds.

## Docker Compose Overview

The `docker-compose.yml` file defines two services:

- **db**: Runs a PostgreSQL database instance.
- **bot**: Runs the Telegram bot application.

### Starting and Stopping the Application

- To start the application:
  ```bash
  docker-compose up --build
  ```

- To stop the application:
  ```bash
  docker-compose down
  ```

### Applying Database Migrations

Whenever you make changes to the Prisma schema, apply the migrations using:

```bash
docker-compose exec bot npx prisma migrate dev
```

