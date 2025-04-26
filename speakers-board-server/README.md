# Speakers Board Server

## Overview
The Speakers Board Server is an Express application built with TypeScript that provides a RESTful API for managing speakers. It allows users to perform CRUD operations on speaker data.

## Features
- Create, Read, Update, and Delete (CRUD) operations for speakers.
- Middleware for request validation and error handling.
- TypeScript for type safety and better development experience.
- Environment variable configuration using a `.env` file.

## Project Structure
```
speakers-board-server
├── src
│   ├── app.ts                # Main application configuration
│   ├── server.ts             # Server entry point
│   ├── config
│   │   └── index.ts         # Configuration settings
│   ├── controllers
│   │   └── speakerController.ts # Controller for speaker operations
│   ├── models
│   │   └── Speaker.ts        # Speaker model definition
│   ├── routes
│   │   └── speakerRoutes.ts   # Routes for speaker endpoints
│   ├── middleware
│   │   └── index.ts          # Middleware functions
│   └── types
│       └── index.ts          # TypeScript interfaces and types
├── tests
│   └── api.test.ts           # API test cases
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # NPM configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd speakers-board-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and set the `API_BASE_URL`:
   ```
   API_BASE_URL=http://localhost:3001
   ```

## Running the Server
To start the server, run:
```
npm run start
```

## API Endpoints
- `GET /speakers` - Retrieve all speakers
- `GET /speakers/:id` - Retrieve a speaker by ID
- `POST /speakers` - Create a new speaker
- `PUT /speakers/:id` - Update a speaker by ID
- `DELETE /speakers/:id` - Delete a speaker by ID

## Testing
To run the tests, use:
```
npm run test
```

## License
This project is licensed under the MIT License.