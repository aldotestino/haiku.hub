import '@/lib/config';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const haiku = pgTable('haiku', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});