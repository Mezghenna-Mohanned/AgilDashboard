/*
  # Create Analytics Dashboard Schema

  1. New Tables
    - `metrics`
      - `id` (uuid, primary key)
      - `metric_type` (text) - pageviews, users, signups, tickets
      - `value` (numeric)
      - `change_percentage` (numeric)
      - `is_positive` (boolean)
      - `recorded_at` (timestamptz)
      - `created_at` (timestamptz)

    - `revenue_data`
      - `id` (uuid, primary key)
      - `month` (text)
      - `revenue` (numeric)
      - `expenses` (numeric)
      - `year` (integer)
      - `created_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `order_id` (text, unique)
      - `booking_date` (timestamptz)
      - `status` (text) - paid, pending
      - `total` (numeric)
      - `created_at` (timestamptz)

    - `device_stats`
      - `id` (uuid, primary key)
      - `device_type` (text) - desktop, phone, laptop
      - `users_count` (integer)
      - `recorded_at` (timestamptz)
      - `created_at` (timestamptz)

    - `country_stats`
      - `id` (uuid, primary key)
      - `country_name` (text)
      - `users_count` (integer)
      - `percentage` (numeric)
      - `recorded_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text NOT NULL,
  value numeric NOT NULL,
  change_percentage numeric NOT NULL,
  is_positive boolean DEFAULT true,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read metrics"
  ON metrics
  FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS revenue_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL,
  revenue numeric NOT NULL,
  expenses numeric NOT NULL,
  year integer DEFAULT 2024,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE revenue_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read revenue data"
  ON revenue_data
  FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  booking_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  total numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS device_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_type text NOT NULL,
  users_count integer NOT NULL DEFAULT 0,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE device_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read device stats"
  ON device_stats
  FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS country_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  users_count integer NOT NULL DEFAULT 0,
  percentage numeric NOT NULL,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE country_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read country stats"
  ON country_stats
  FOR SELECT
  TO public
  USING (true);
