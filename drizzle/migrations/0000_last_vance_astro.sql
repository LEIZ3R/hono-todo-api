CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`todo` text NOT NULL,
	`is_done` integer DEFAULT false,
	`create_at` text DEFAULT CURRENT_TIMESTAMP
);
