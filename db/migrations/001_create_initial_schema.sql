-- Migration: 001_create_initial_schema.sql
-- Description: Create initial database schema for speakers board application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create social_network enum type
CREATE TYPE social_network AS ENUM (
  'linkedin',
  'twitter',
  'facebook',
  'instagram',
  'youtube',
  'github',
  'tiktok',
  'spotify',
  'discord'
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  experience TEXT,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
  sessions_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create languages table (for normalization)
CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create topics table (for normalization)
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create speaker_languages junction table
CREATE TABLE IF NOT EXISTS speaker_languages (
  speaker_id UUID REFERENCES speakers(id) ON DELETE CASCADE,
  language_id INTEGER REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (speaker_id, language_id)
);

-- Create speaker_topics junction table
CREATE TABLE IF NOT EXISTS speaker_topics (
  speaker_id UUID REFERENCES speakers(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (speaker_id, topic_id)
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  speaker_id UUID REFERENCES speakers(id) ON DELETE CASCADE,
  platform social_network NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (speaker_id, platform)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  attendees INTEGER NOT NULL DEFAULT 0,
  video_url VARCHAR(255),
  speaker_id UUID REFERENCES speakers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  speaker_id UUID NOT NULL REFERENCES speakers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_speaker_languages_speaker_id ON speaker_languages(speaker_id);
CREATE INDEX idx_speaker_topics_speaker_id ON speaker_topics(speaker_id);
CREATE INDEX idx_social_links_speaker_id ON social_links(speaker_id);
CREATE INDEX idx_sessions_speaker_id ON sessions(speaker_id);
CREATE INDEX idx_reviews_speaker_id ON reviews(speaker_id); 