import { 
  type Event, type InsertEvent, events,
  type Member, type InsertMember, members,
  type BlogPost, type InsertBlogPost, blogPosts,
  type GalleryImage, type InsertGalleryImage, galleryImages,
  type ContactMessage, type InsertContactMessage, contactMessages,
  type User, type InsertUser, users,
  type Student, type InsertStudent, students,
  type ResourceLink, type InsertResourceLink, resourceLinks
} from "@shared/schema";
import { eq } from 'drizzle-orm';
import { db } from './db';

// Interface for all storage operations
export interface IStorage {
  // User operations
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
  
  // Student repository operations
  getAllStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  
  // Resource link operations
  getAllResourceLinks(): Promise<ResourceLink[]>;
  getResourceLink(id: number): Promise<ResourceLink | undefined>;
  getResourceLinksByCategory(category: string): Promise<ResourceLink[]>;
  createResourceLink(link: InsertResourceLink): Promise<ResourceLink>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private eventsList: Map<number, Event>;
  private membersList: Map<number, Member>;
  private blogPostsList: Map<number, BlogPost>;
  private galleryImagesList: Map<number, GalleryImage>;
  private contactMessagesList: Map<number, ContactMessage>;
  private studentsList: Map<number, Student>;
  private resourceLinksList: Map<number, ResourceLink>;
  
  // IDs for auto-increment
  private userCurrentId: number;
  private eventCurrentId: number;
  private memberCurrentId: number;
  private blogPostCurrentId: number;
  private galleryImageCurrentId: number;
  private contactMessageCurrentId: number;
  private studentCurrentId: number;
  private resourceLinkCurrentId: number;

  constructor() {
    this.users = new Map();
    this.eventsList = new Map();
    this.membersList = new Map();
    this.blogPostsList = new Map();
    this.galleryImagesList = new Map();
    this.contactMessagesList = new Map();
    this.studentsList = new Map();
    this.resourceLinksList = new Map();
    
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
    this.memberCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.galleryImageCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.studentCurrentId = 1;
    this.resourceLinkCurrentId = 1;
    
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
      name: "Mateo Pirela Pulido",
      role: "Club Co-President: Founder",
      bio: "Lover of philosophy. Has participated in one national philosophy competition and different local and regional events.",
      focus: "Philosophy, critical thinking",
      imageUrl: "https://replit.com/@mateopirela08/PhilosophyDialogue#https:/images.unsplash.com/Photo%20Mateo.png"
    });
    
    this.createMember({
      name: "Juan Carlos Gonzalez",
      role: "Club Director",
      bio: "Professor of Philosophy and founder of the club initiative",
      focus: "expert in philosophy and debate",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createMember({
      name: "Daniela Rodriguez",
      role: "",
      bio: "",
      focus: "Debate and Model UN",
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
    const member: Member = { 
      ...insertMember, 
      id,
      imageUrl: insertMember.imageUrl || null 
    };
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
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id,
      imageUrl: insertBlogPost.imageUrl || null
    };
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
  
  // Student repository operations
  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.studentsList.values());
  }
  
  async getStudent(id: number): Promise<Student | undefined> {
    return this.studentsList.get(id);
  }
  
  async getStudentByEmail(email: string): Promise<Student | undefined> {
    return Array.from(this.studentsList.values()).find(
      (student) => student.email === email
    );
  }
  
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.studentCurrentId++;
    const now = new Date();
    const student: Student = { 
      ...insertStudent, 
      id, 
      joinDate: now,
      isActive: insertStudent.isActive !== undefined ? insertStudent.isActive : true,
      phone: insertStudent.phone || null,
      graduationYear: insertStudent.graduationYear || null,
      major: insertStudent.major || null,
      interests: insertStudent.interests || []
    };
    this.studentsList.set(id, student);
    return student;
  }
  
  // Resource link operations
  async getAllResourceLinks(): Promise<ResourceLink[]> {
    return Array.from(this.resourceLinksList.values());
  }
  
  async getResourceLink(id: number): Promise<ResourceLink | undefined> {
    return this.resourceLinksList.get(id);
  }
  
  async getResourceLinksByCategory(category: string): Promise<ResourceLink[]> {
    return Array.from(this.resourceLinksList.values()).filter(
      (link) => link.category === category
    );
  }
  
  async createResourceLink(insertResourceLink: InsertResourceLink): Promise<ResourceLink> {
    const id = this.resourceLinkCurrentId++;
    const resourceLink: ResourceLink = { 
      ...insertResourceLink, 
      id,
      description: insertResourceLink.description || null
    };
    this.resourceLinksList.set(id, resourceLink);
    return resourceLink;
  }
}

// Initialize the database with sample resource links
const initializeResourceLinks = async (storage: MemStorage) => {
  // Philosophy resources
  await storage.createResourceLink({
    title: "Stanford Encyclopedia of Philosophy",
    url: "https://plato.stanford.edu/",
    description: "An authoritative encyclopedia of philosophy with in-depth articles written by experts, covering all areas of philosophy.",
    category: "philosophy",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "Philosophy Now",
    url: "https://philosophynow.org/",
    description: "A magazine for everyone interested in ideas. Contains articles on all aspects of Western philosophy, including contemporary issues.",
    category: "philosophy",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "The Partially Examined Life",
    url: "https://partiallyexaminedlife.com/",
    description: "A philosophy podcast by some guys who were at one point set on doing philosophy for a living but then thought better of it.",
    category: "philosophy",
    type: "podcast"
  });
  
  await storage.createResourceLink({
    title: "Crash Course Philosophy",
    url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR",
    description: "A beginner-friendly video series covering major philosophical concepts and figures throughout history.",
    category: "philosophy",
    type: "video"
  });
  
  // Debate resources
  await storage.createResourceLink({
    title: "Fernando Millares",
    url: "https://youtube.com/@fermiralles?si=2u2tCzwp7vkCBGdU",
    description: "Comprehensive guide to the AREL method (Assertion, Reasoning, Evidence, Link) for structured argumentation in debates.",
    category: "debate",
    type: "video"
  });
  
  await storage.createResourceLink({
    title: "International Debate Education Association",
    url: "https://idebate.net/",
    description: "Resources for debate formats, argument construction, and global debate competitions.",
    category: "debate",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "Logical Fallacies: The Complete List",
    url: "https://www.uvu.edu/writingcenter/docs/logicalfallacies.pdf",
    description: "Interactive guide to logical fallacies commonly found in debates with examples and explanations.",
    category: "debate",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "World Schools Debating Championships Guide",
    url: "https://www.wsdcdebating.org/about-9",
    description: "Official guide to the World Schools Debating format with rules, examples, and strategies.",
    category: "debate",
    type: "document"
  });
  
  // Model UN resources
  await storage.createResourceLink({
    title: "United Nations Official Website",
    url: "https://www.un.org/",
    description: "Primary source for all UN-related research, resolutions, and international affairs information.",
    category: "model-un",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "Best Delegate Model UN Guide",
    url: "https://bestdelegate.com/",
    description: "Comprehensive resources for Model UN preparation, procedures, position papers, and resolution writing.",
    category: "model-un",
    type: "website"
  });
  
  await storage.createResourceLink({
    title: "Rules of Procedure for Model UN",
    url: "https://www.un.org/en/model-united-nations/rules-procedure-0",
    description: "Official rules of procedure used in National Model United Nations conferences with motions and voting procedures.",
    category: "model-un",
    type: "document"
  });
  
  await storage.createResourceLink({
    title: "Model UN Parliamentary Procedure",
    url: "https://www.youtube.com/watch?v=BYYwBLJ9q5E",
    description: "Detailed tutorial on parliamentary procedure, points, and motions in Model UN debates.",
    category: "model-un",
    type: "video"
  });
};

// Database storage implementation using Drizzle ORM
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Event operations
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(events);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }
  
  // Member operations
  async getAllMembers(): Promise<Member[]> {
    return db.select().from(members);
  }
  
  async getMember(id: number): Promise<Member | undefined> {
    const [member] = await db.select().from(members).where(eq(members.id, id));
    return member || undefined;
  }
  
  async createMember(insertMember: InsertMember): Promise<Member> {
    const [member] = await db
      .insert(members)
      .values(insertMember)
      .returning();
    return member;
  }
  
  // Blog post operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }
  
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return post;
  }
  
  // Gallery image operations
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages);
  }
  
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
    return image || undefined;
  }
  
  async createGalleryImage(insertGalleryImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db
      .insert(galleryImages)
      .values(insertGalleryImage)
      .returning();
    return image;
  }
  
  // Contact message operations
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages);
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }
  
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertContactMessage)
      .returning();
    return message;
  }
  
  // Student repository operations
  async getAllStudents(): Promise<Student[]> {
    return db.select().from(students);
  }
  
  async getStudent(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }
  
  async getStudentByEmail(email: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.email, email));
    return student || undefined;
  }
  
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db
      .insert(students)
      .values(insertStudent)
      .returning();
    return student;
  }
  
  // Resource link operations
  async getAllResourceLinks(): Promise<ResourceLink[]> {
    return db.select().from(resourceLinks);
  }
  
  async getResourceLink(id: number): Promise<ResourceLink | undefined> {
    const [link] = await db.select().from(resourceLinks).where(eq(resourceLinks.id, id));
    return link || undefined;
  }
  
  async getResourceLinksByCategory(category: string): Promise<ResourceLink[]> {
    return db.select().from(resourceLinks).where(eq(resourceLinks.category, category));
  }
  
  async createResourceLink(insertResourceLink: InsertResourceLink): Promise<ResourceLink> {
    const [link] = await db
      .insert(resourceLinks)
      .values(insertResourceLink)
      .returning();
    return link;
  }
}

// Initialize sample student data for the repository
const initializeSampleStudents = async (storage: MemStorage) => {
  // Philosophy students
  await storage.createStudent({
    name: "Emma Lee",
    email: "emma.lee@university.edu",
    phone: "555-123-4567",
    graduationYear: "2024",
    major: "Philosophy",
    interests: ["philosophy"],
    isActive: true
  });
  
  await storage.createStudent({
    name: "James Wilson",
    email: "jwilson@university.edu",
    phone: "555-987-6543",
    graduationYear: "2025",
    major: "Philosophy and Political Science",
    interests: ["philosophy", "debate"],
    isActive: true
  });

  // Debate students
  await storage.createStudent({
    name: "Sofia Martinez",
    email: "smartinez@university.edu",
    phone: "555-456-7890",
    graduationYear: "2023",
    major: "Communications",
    interests: ["debate"],
    isActive: true
  });
  
  await storage.createStudent({
    name: "Liam Johnson",
    email: "ljohnson@university.edu",
    phone: "555-222-3333",
    graduationYear: "2024",
    major: "Political Science",
    interests: ["debate", "model-un"],
    isActive: true
  });

  // Model UN students
  await storage.createStudent({
    name: "Olivia Kim",
    email: "okim@university.edu",
    phone: "555-888-9999",
    graduationYear: "2023",
    major: "International Relations",
    interests: ["model-un"],
    isActive: true
  });
  
  await storage.createStudent({
    name: "Noah Patel",
    email: "npatel@university.edu",
    phone: "555-777-8888",
    graduationYear: "2025",
    major: "Economics and Global Studies",
    interests: ["model-un", "philosophy"],
    isActive: true
  });
  
  // Alumni
  await storage.createStudent({
    name: "Isabella Garcia",
    email: "igarcia@alumni.university.edu",
    phone: "555-444-5555",
    graduationYear: "2022",
    major: "Philosophy",
    interests: ["philosophy", "debate"],
    isActive: false
  });
};

// For development, we'll use in-memory storage
// In production, this would be:
// export const storage = new DatabaseStorage();
export const storage = new MemStorage();

// Initialize with sample data
initializeResourceLinks(storage as MemStorage).catch(console.error);
initializeSampleStudents(storage as MemStorage).catch(console.error);
