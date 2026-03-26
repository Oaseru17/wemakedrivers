-- WeMake Drivers — Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Students table
create table if not exists students (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null default '',
  email text not null default '',
  area text not null default '',
  lesson_type text not null default 'automatic'
    check (lesson_type in ('automatic', 'manual', 'intensive', 'test-prep', 'motorway', 'refresher')),
  status text not null default 'active'
    check (status in ('active', 'completed', 'paused')),
  created_at timestamptz default now()
);

-- Bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  student_id uuid not null references students(id) on delete cascade,
  date date not null,
  hour int not null check (hour >= 0 and hour <= 23),
  lesson_type text not null default 'automatic'
    check (lesson_type in ('automatic', 'manual', 'intensive', 'test-prep', 'motorway', 'refresher')),
  status text not null default 'confirmed'
    check (status in ('confirmed', 'cancelled', 'no-show', 'completed')),
  rate numeric(10, 2) not null default 40,
  created_at timestamptz default now(),
  unique (date, hour)
);

-- Blocked slots table
create table if not exists blocked_slots (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  hour int not null check (hour >= 0 and hour <= 23),
  unique (date, hour)
);

-- Indexes for fast queries
create index if not exists idx_bookings_date on bookings(date);
create index if not exists idx_bookings_student on bookings(student_id);
create index if not exists idx_blocked_date on blocked_slots(date);
create index if not exists idx_students_status on students(status);

-- Enable Row Level Security
alter table students enable row level security;
alter table bookings enable row level security;
alter table blocked_slots enable row level security;

-- Allow anonymous read/write (protected by access code in the frontend)
create policy "Allow all access to students" on students for all using (true) with check (true);
create policy "Allow all access to bookings" on bookings for all using (true) with check (true);
create policy "Allow all access to blocked_slots" on blocked_slots for all using (true) with check (true);

-- Enable realtime for bookings
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table students;
alter publication supabase_realtime add table blocked_slots;

-- Seed data (optional — remove if not needed)
insert into students (name, phone, email, area, lesson_type, status) values
  ('Sarah Mitchell', '07700 900123', 'sarah.m@email.com', 'North London', 'automatic', 'active'),
  ('James Okonkwo', '07700 900456', 'james.o@email.com', 'East London', 'manual', 'active'),
  ('Priya Sharma', '07700 900789', 'priya.s@email.com', 'Central London', 'test-prep', 'active'),
  ('Tom Williams', '07700 900321', 'tom.w@email.com', 'South London', 'intensive', 'active'),
  ('Amara Johnson', '07700 900654', 'amara.j@email.com', 'West London', 'automatic', 'active'),
  ('Ryan Chen', '07700 900987', 'ryan.c@email.com', 'Croydon', 'motorway', 'active');
