import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const securityUsersTable = pgTable('security_users', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
});
