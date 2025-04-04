import { users, type User, type InsertUser } from "@shared/schema";
import { inquiries, type Inquiry, type InsertInquiry } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  getAllInquiries(): Promise<Inquiry[]>;
  updateInquiryContactStatus(id: number, contacted: boolean): Promise<Inquiry | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inquiriesMap: Map<number, Inquiry>;
  private userCurrentId: number;
  private inquiryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.inquiriesMap = new Map();
    this.userCurrentId = 1;
    this.inquiryCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const now = new Date();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: now, 
      contacted: false 
    };
    this.inquiriesMap.set(id, inquiry);
    return inquiry;
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiriesMap.get(id);
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiriesMap.values());
  }

  async updateInquiryContactStatus(id: number, contacted: boolean): Promise<Inquiry | undefined> {
    const inquiry = this.inquiriesMap.get(id);
    if (!inquiry) return undefined;
    
    const updatedInquiry = { ...inquiry, contacted };
    this.inquiriesMap.set(id, updatedInquiry);
    return updatedInquiry;
  }
}

// Create and export a singleton instance
export const storage = new MemStorage();
