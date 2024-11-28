import { pgTable, serial, varchar, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';

// Define an enum for the user role
export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user']);

// Define the chats table
export const chats = pgTable('chats', {
    id: serial('id').primaryKey(), // serial creates an integer primary key
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', { length: 256 }).notNull(),
    fileKey: text('filekey').notNull(),
});

// Define the messages table
export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id') // Match type with `chats.id`
        .references(() => chats.id) // Add foreign key reference
        .notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull(), // Use the defined enum
});
