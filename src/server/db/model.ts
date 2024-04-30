import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { Content } from 'next/font/google';
import { title } from 'process';

const haikus = sqliteTable('haikus', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  Content: text('content').notNull(),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});