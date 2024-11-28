import {PgTable, pgTable, serial, varchar, text, timestamp, pgEnum} from 'drizzle-orm/pg-core'


export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user']);


export const chats = pgTable('chats' , {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    crearedAt: timestamp('pdf_url').notNull().defaultNow(),
    userId: varchar('user_id', {length:256}).notNull(),
    fileKey: text('filekey').notNull(),

})


export const messages = pgTable("messages", {
    id: serial('id').primaryKey(),
    chatId: text('chat_id').references(()=>chats.id).notNull(),
    pdfUrl: text('pdf_url').notNull(),
    crearedAt: timestamp('pdf_url').notNull().defaultNow(),
    role: userSystemEnum("role").notNull(),
})