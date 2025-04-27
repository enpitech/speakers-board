# Database Migrations

This directory contains SQL migration files for setting up and managing the PostgreSQL database schema for the Speakers Board application.

## Migration Files

- `001_create_initial_schema.sql`: Creates the initial database schema
- `001_rollback.sql`: Rolls back the changes made by the initial schema migration

## How to Apply Migrations

### Prerequisites

- PostgreSQL installed and running
- A database created for the application

### Applying Migrations

To apply a migration, run:

```bash
psql -U your_username -d your_database_name -f db/migrations/001_create_initial_schema.sql
```

Replace `your_username` and `your_database_name` with your PostgreSQL username and the name of your database.

### Rolling Back Migrations

To roll back a migration, run:

```bash
psql -U your_username -d your_database_name -f db/migrations/001_rollback.sql
```

## Database Schema

The migrations create the following tables:

- `speakers`: Main speakers information
- `languages`: Available languages
- `topics`: Available topics
- `speaker_languages`: Junction table linking speakers to languages
- `speaker_topics`: Junction table linking speakers to topics
- `social_links`: Social media links for speakers
- `sessions`: Speaking sessions
- `reviews`: Reviews of speakers

## Development Workflow

1. When making changes to the database schema, create a new numbered migration file (e.g., `002_add_new_feature.sql`)
2. Always create a corresponding rollback file (e.g., `002_rollback.sql`)
3. Apply migrations in sequential order
4. Test both the migration and rollback scripts in a development environment before applying to production
