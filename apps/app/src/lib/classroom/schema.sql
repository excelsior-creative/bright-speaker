create table if not exists classroom_classes (
  id text primary key,
  teacher_user_id text not null,
  name text not null,
  code text not null unique,
  grade_band text,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists classroom_students (
  id text primary key,
  class_id text not null references classroom_classes(id) on delete cascade,
  display_name text not null,
  join_token text not null unique,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists classroom_practice_sessions (
  id text primary key,
  class_id text not null references classroom_classes(id) on delete cascade,
  student_id text not null references classroom_students(id) on delete cascade,
  prompt_id integer not null,
  prompt_title text not null,
  score integer not null check (score >= 0 and score <= 100),
  filler_count integer not null check (filler_count >= 0),
  duration_seconds integer not null check (duration_seconds >= 0 and duration_seconds <= 600),
  eye_contact_percent integer not null check (eye_contact_percent >= -1 and eye_contact_percent <= 100),
  words_per_minute integer not null check (words_per_minute >= 0 and words_per_minute <= 400),
  xp_earned integer not null check (xp_earned >= 0 and xp_earned <= 1000),
  transcript_excerpt text,
  created_at timestamptz not null default now()
);

create index if not exists classroom_classes_teacher_idx on classroom_classes(teacher_user_id);
create index if not exists classroom_students_class_idx on classroom_students(class_id);
create index if not exists classroom_sessions_class_idx on classroom_practice_sessions(class_id, created_at desc);
