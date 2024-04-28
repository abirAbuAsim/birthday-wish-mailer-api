# Birthday Wish Mailer

Birthday Wish Mailer is a Node.js project using the Express framework to automatically send a birthday greeting email to registered customers on their birthday. The system uses Node-Cron for scheduling and Nodemailer for simulating email sending in a development environment.

## Prerequisites

Ensure the following software is installed on your system before you proceed with the setup:

-   Docker
-   Docker Compose
-   Node.js (v12.0.0 or higher)
-   npm or yarn (for managing packages)
-   Sequelize CLI (for database migrations)

## Installation

1. **Clone the repository:**

    ```bash
    git clone [your-repository-link]
    cd birthday-wish-mailer
    ```

2. **Set up environment variables:**
   Copy the `.env.example` file to create your `.env` file:

    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file to fill in the environment-specific variables such as database credentials and any other necessary configurations.

3. **Run Docker Compose:**
   To set up and run the Postgres database on Docker, execute the following command:

    ```bash
    docker-compose up -d
    ```

4. **Install dependencies:**
   Install all required npm packages by running:

    ```bash
    npm install
    ```

5. **Run migrations:**
   Apply database migrations using Sequelize:
    ```bash
    npx sequelize-cli db:migrate
    ```

## Usage

To start the server in development mode, use the following command:

```bash
npm run dev
```

## API Endpoints

-   `http://localhost:3000/v1/auth/generate-token` is a POST request that is used to generate tokens for authentication.

    ### Response

    The response returns a JSON object with the following schema:

    ```json
    {
    	"tokens": {
    		"refresh": {
    			"token": "string",
    			"expires": "integer"
    		},
    		"access": {
    			"token": "string",
    			"expires": "integer"
    		}
    	}
    }
    ```

-   `tokens` (object) - An object containing the generated tokens.
    -   `refresh` (object) - An object containing the refresh token and its expiration time.
        -   `token` (string) - The refresh token.
        -   `expires` (integer) - The expiration time of the refresh token.
    -   `access` (object) - An object containing the access token and its expiration time.
        -   `token` (string) - The access token.
        -   `expires` (integer) - The expiration time of the access token.
-   `POST /customer/register`: Registers a new customer with their name, email, and birthday.
    The endpoint allows the user to register a customer via an HTTP POST request.

    ### Authorization

    This endpoint requires a valid JWT (JSON Web Token) to be included in the `Authorization` header of the request. The token should be prefixed with "Bearer ".

    ### Request Headers

    -   `Content-Type`: `application/json`
    -   `Authorization`: `Bearer <your-token-here>`

    ### Request Body

    The request should include a JSON payload with the following parameters:

    -   `name` (string): The name of the customer.
    -   `email` (string): The email address of the customer.
    -   `birthday` (string): The birthday of the customer.

    ```json
    {
    	"name": "",
    	"email": "",
    	"birthday": ""
    }
    ```

    ### Response

    The response to the request is a JSON object with the following schema:

    ```json
    {
    	"customer": {
    		"created_date_time": "",
    		"modified_date_time": "",
    		"id": 0,
    		"name": "",
    		"email": "",
    		"birthday": ""
    	}
    }
    ```

    -   `created_date_time` (string): The date and time when the customer was created.
    -   `modified_date_time` (string): The date and time when the customer information was last modified.
    -   `id` (integer): The unique identifier of the customer.
    -   `name` (string): The name of the customer.
    -   `email` (string): The email address of the customer.
    -   `birthday` (string): The birthday of the customer.

    The response has a status code of 201 and a content type of `application/json`.
