import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Event model
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(), // "philosophy", "debate", or "model-un"
});

// Member model
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  focus: text("focus").notNull(), // "Philosophy", "Debate", or "Model UN"
  imageUrl: text("imageUrl"),
});

// Blog post model
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(), // "philosophy", "debate", or "model-un"
  date: text("date").notNull(),
  authorId: integer("author_id").notNull(),
  imageUrl: text("imageUrl"),
});

// Gallery image model
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  imageUrl: text("imageUrl").notNull(),
});

// Contact message model
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User model (from the existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Schema for inserting events
export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  time: true,
  location: true,
  category: true,
});

// Schema for inserting members
export const insertMemberSchema = createInsertSchema(members).pick({
  name: true,
  role: true,
  bio: true,
  focus: true,
  imageUrl: true,
});

// Schema for inserting blog posts
export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  date: true,
  authorId: true,
  imageUrl: true,
});

// Schema for inserting gallery images
export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  date: true,
  imageUrl: true,
});

// Schema for inserting contact messages
export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Schema for inserting users (from the existing schema)
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types for insert operations
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Types for select operations
export type Event = typeof events.$inferSelect;
export type Member = typeof members.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type User = typeof users.$inferSelect;
