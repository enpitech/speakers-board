-- Rollback Migration: 001_rollback.sql
-- Description: Rollback the initial database schema for speakers board application

-- Drop indexes
DROP INDEX IF EXISTS idx_reviews_speaker_id;
DROP INDEX IF EXISTS idx_sessions_speaker_id;
DROP INDEX IF EXISTS idx_social_links_speaker_id;
DROP INDEX IF EXISTS idx_speaker_topics_speaker_id;
DROP INDEX IF EXISTS idx_speaker_languages_speaker_id;

-- Drop tables in reverse order of creation (respecting foreign key constraints)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS speaker_topics;
DROP TABLE IF EXISTS speaker_languages;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS speakers;

-- Drop enum type
DROP TYPE IF EXISTS social_network; 