import { 
  type Event, type InsertEvent, events,
  type Member, type InsertMember, members,
  type BlogPost, type InsertBlogPost, blogPosts,
  type GalleryImage, type InsertGalleryImage, galleryImages,
  type ContactMessage, type InsertContactMessage, contactMessages,
  type User, type InsertUser, users
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Member operations
  getAllMembers(): Promise<Member[]>;
  getMember(id: number): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  
  // Blog post operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Gallery image operations
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  
  // Contact message operations
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private eventsList: Map<number, Event>;
  private membersList: Map<number, Member>;
  private blogPostsList: Map<number, BlogPost>;
  private galleryImagesList: Map<number, GalleryImage>;
  private contactMessagesList: Map<number, ContactMessage>;
  
  // IDs for auto-increment
  private userCurrentId: number;
  private eventCurrentId: number;
  private memberCurrentId: number;
  private blogPostCurrentId: number;
  private galleryImageCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.eventsList = new Map();
    this.membersList = new Map();
    this.blogPostsList = new Map();
    this.galleryImagesList = new Map();
    this.contactMessagesList = new Map();
    
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
    this.memberCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.galleryImageCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  // Initialize with sample data for development
  private initializeSampleData() {
    // Sample events
    this.createEvent({
      title: "Ethics in the Digital Age",
      description: "A discussion on ethical implications of emerging technologies, privacy concerns, and digital rights.",
      date: "Oct 15, 2023",
      time: "5:00 PM - 7:00 PM",
      location: "Main Campus, Building A, Room 203",
      category: "philosophy"
    });
    
    this.createEvent({
      title: "Parliamentary Debate Tournament",
      description: "Regional tournament featuring teams from neighboring universities. Open to all experience levels.",
      date: "Oct 22, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Student Center, Conference Rooms A-D",
      category: "debate"
    });
    
    this.createEvent({
      title: "Northeast Regional Model UN",
      description: "Three-day conference simulating various UN committees addressing global challenges.",
      date: "Nov 5-7, 2023",
      time: "All Day Event",
      location: "Metropolitan Convention Center",
      category: "model-un"
    });
    
    // Sample members
    this.createMember({
      name: "Sarah Johnson",
      role: "Club President, Philosophy Focus",
      bio: "Philosophy major with a focus on ethics and political philosophy. Has participated in three national debate competitions.",
      focus: "Philosophy",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createMember({
      name: "David Chen",
      role: "Debate Team Captain",
      bio: "Political Science and Economics double major. Award-winning debater with expertise in parliamentary debate format.",
      focus: "Debate",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createMember({
      name: "Maya Patel",
      role: "Model UN Coordinator",
      bio: "International Relations major with a minor in Environmental Studies. Has attended MUN conferences across the country.",
      focus: "Model UN",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    // Sample blog posts
    this.createBlogPost({
      title: "The Ethics of Artificial Intelligence",
      content: "Full content of the article...",
      excerpt: "Exploring the moral implications of AI development and the philosophical questions raised by machine consciousness and decision-making.",
      category: "philosophy",
      date: "Oct 5, 2023",
      authorId: 1,
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });
    
    this.createBlogPost({
      title: "Climate Change Diplomacy",
      content: "Full content of the article...",
      excerpt: "Analyzing the effectiveness of international cooperation on climate change and the challenges faced in the UN Climate Change Conference.",
      category: "model-un",
      date: "Sep 27, 2023",
      authorId: 3,
      imageUrl: "https://images.unsplash.com/photo-1422466654108-5e533f591881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });
    
    this.createBlogPost({
      title: "The Art of Refutation",
      content: "Full content of the article...",
      excerpt: "A comprehensive guide to effectively countering arguments in competitive debate, with techniques for identifying logical fallacies.",
      category: "debate",
      date: "Sep 15, 2023",
      authorId: 2,
      imageUrl: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });
    
    // Sample gallery images
    this.createGalleryImage({
      title: "Regional Debate Finals",
      date: "Spring 2023",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "Guest Lecture Series",
      date: "Fall 2022",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "International MUN",
      date: "Winter 2023",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "Annual Social Gathering",
      date: "Summer 2023",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "Philosophy Café",
      date: "Spring 2023",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "National Awards Ceremony",
      date: "Winter 2022",
      imageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "Debate Skills Workshop",
      date: "Fall 2022",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryImage({
      title: "Model UN Preparation",
      date: "Fall 2023",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
  }

  // User operations (existing)
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
  
  // Event operations
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.eventsList.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.eventsList.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCurrentId++;
    const event: Event = { ...insertEvent, id };
    this.eventsList.set(id, event);
    return event;
  }
  
  // Member operations
  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.membersList.values());
  }
  
  async getMember(id: number): Promise<Member | undefined> {
    return this.membersList.get(id);
  }
  
  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = this.memberCurrentId++;
    const member: Member = { ...insertMember, id };
    this.membersList.set(id, member);
    return member;
  }
  
  // Blog post operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPostsList.values());
  }
  
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPostsList.get(id);
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPostsList.set(id, blogPost);
    return blogPost;
  }
  
  // Gallery image operations
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesList.values());
  }
  
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    return this.galleryImagesList.get(id);
  }
  
  async createGalleryImage(insertGalleryImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.galleryImageCurrentId++;
    const galleryImage: GalleryImage = { ...insertGalleryImage, id };
    this.galleryImagesList.set(id, galleryImage);
    return galleryImage;
  }
  
  // Contact message operations
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesList.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessagesList.get(id);
  }
  
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const now = new Date();
    const contactMessage: ContactMessage = { ...insertContactMessage, id, createdAt: now };
    this.contactMessagesList.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();
