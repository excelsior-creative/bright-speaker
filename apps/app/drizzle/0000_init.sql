CREATE TABLE "progress" (
	"user_id" text PRIMARY KEY NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"last_session_date" text,
	"badges" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"prompt_id" integer NOT NULL,
	"prompt_title" text NOT NULL,
	"score" integer NOT NULL,
	"filler_count" integer NOT NULL,
	"filler_words" jsonb NOT NULL,
	"duration" integer NOT NULL,
	"eye_contact_percent" integer NOT NULL,
	"words_per_minute" integer NOT NULL,
	"xp_earned" integer NOT NULL,
	"transcript" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "sessions_user_created_idx" ON "sessions" USING btree ("user_id","created_at" DESC NULLS LAST);