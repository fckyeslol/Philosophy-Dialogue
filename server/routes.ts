import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertEventSchema, 
  insertBlogPostSchema, 
  insertMemberSchema, 
  insertGalleryImageSchema,
  insertResourceLinkSchema
} from "@shared/schema";
import { z } from "zod";

// Simple response generator for philosophy, debate, and humanities topics
function generatePhilosophyResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Philosophy topics
  if (lowerMessage.includes('socrates') || lowerMessage.includes('socratic')) {
    return "Socratic questioning is a method of inquiry developed by Socrates that involves asking probing questions to explore complex ideas and uncover underlying assumptions. It's based on the principle that through systematic questioning, we can discover truth and expose ignorance. The method typically involves asking questions like 'What do you mean by...?', 'How do you know...?', and 'What evidence supports...?'";
  }
  
  if (lowerMessage.includes('plato')) {
    return "Plato (428-348 BCE) was a Greek philosopher and student of Socrates. He founded the Academy in Athens and is known for his theory of Forms, which suggests that our material world is a shadow of a perfect, unchanging realm of ideas. His famous works include 'The Republic', where he explores justice and the ideal state, and the 'Allegory of the Cave', which illustrates the journey from ignorance to knowledge.";
  }
  
  if (lowerMessage.includes('aristotle')) {
    return "Aristotle (384-322 BCE) was a student of Plato and tutor to Alexander the Great. Unlike his teacher, Aristotle believed that knowledge comes from empirical observation of the world. He made significant contributions to logic, ethics, politics, and natural sciences. His 'Nicomachean Ethics' explores virtue ethics and the concept of eudaimonia (flourishing or the good life).";
  }
  
  // Debate topics
  if (lowerMessage.includes('debate') && (lowerMessage.includes('structure') || lowerMessage.includes('argument'))) {
    return "A strong debate argument typically follows the AREL structure: Assertion (your claim), Reasoning (why your claim is true), Evidence (facts, statistics, or examples that support your reasoning), and Link (how this connects back to the overall debate topic). Remember to address counterarguments and use logical reasoning throughout.";
  }
  
  if (lowerMessage.includes('logical fallac')) {
    return "Logical fallacies are errors in reasoning that weaken arguments. Common ones include: Ad Hominem (attacking the person rather than their argument), Straw Man (misrepresenting someone's position), False Dilemma (presenting only two options when more exist), and Appeal to Authority (assuming something is true because an authority figure said it). Learning to identify these helps improve critical thinking.";
  }
  
  // Model UN topics
  if (lowerMessage.includes('model un') || lowerMessage.includes('mun')) {
    return "Model United Nations simulates UN committees where delegates represent countries and debate global issues. Key components include: position papers (outlining your country's stance), parliamentary procedure (rules for debate), draft resolutions (proposed solutions), and diplomatic negotiations. Research your country's foreign policy and practice public speaking for success.";
  }
  
  if (lowerMessage.includes('resolution') && lowerMessage.includes('un')) {
    return "A UN resolution typically has three parts: the Header (committee name, topic, sponsors), Preambulatory Clauses (background information starting with words like 'Noting', 'Recognizing', 'Concerned'), and Operative Clauses (specific actions starting with words like 'Calls upon', 'Requests', 'Decides'). Each clause ends with a comma or semicolon, and the resolution ends with a period.";
  }
  
  // Ethics and humanities
  if (lowerMessage.includes('ethics') || lowerMessage.includes('moral')) {
    return "Ethics is the branch of philosophy that examines what is morally right and wrong. Major ethical theories include: Utilitarianism (actions are right if they produce the greatest good for the greatest number), Deontological Ethics (actions are right if they follow moral rules or duties), and Virtue Ethics (actions are right if they reflect good character traits). Each approach offers different perspectives on moral decision-making.";
  }
  
  if (lowerMessage.includes('critical thinking')) {
    return "Critical thinking involves analyzing information objectively and making reasoned judgments. Key skills include: questioning assumptions, evaluating evidence, identifying biases, considering alternative perspectives, and drawing logical conclusions. Practice by asking 'What evidence supports this?', 'What are the counterarguments?', and 'What are the implications of this reasoning?'";
  }
  
  // General philosophy
  if (lowerMessage.includes('what is philosophy')) {
    return "Philosophy, from the Greek 'philosophia' meaning 'love of wisdom', is the study of fundamental questions about existence, knowledge, values, reason, mind, and language. It uses rational argument and systematic analysis to explore questions like: What is the meaning of life? How do we know what we know? What is justice? Philosophy develops critical thinking skills essential for understanding complex issues.";
  }
  
  // Default response for unrecognized topics
  return "That's an interesting question about philosophy and humanities! While I can discuss topics like ancient philosophy (Socrates, Plato, Aristotle), debate techniques, Model UN procedures, ethics, and critical thinking, I'd love to help you explore this topic further. Could you be more specific about what aspect you'd like to discuss? For example, are you interested in a particular philosopher, ethical dilemma, or debate strategy?";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // Get all events
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });

  // Get event by ID
  app.get('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  });

  // Get all members
  app.get('/api/members', async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch members' });
    }
  });

  // Get all blog posts
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });

  // Get blog post by ID
  app.get('/api/blog-posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  });

  // Get all gallery images
  app.get('/api/gallery-images', async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch gallery images' });
    }
  });

  // Submit contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid form data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to submit contact form' });
    }
  });

  // Resource Links Endpoints
  // Get all resource links
  app.get('/api/resources', async (req, res) => {
    try {
      const resources = await storage.getAllResourceLinks();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch resources' });
    }
  });

  // Get resource links by category
  app.get('/api/resources/category/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const resources = await storage.getResourceLinksByCategory(category);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch resources' });
    }
  });

  // Get resource link by ID
  app.get('/api/resources/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResourceLink(id);
      
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch resource' });
    }
  });

  // Add a new resource link
  app.post('/api/resources', async (req, res) => {
    try {
      const validatedData = insertResourceLinkSchema.parse(req.body);
      const resource = await storage.createResourceLink(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid resource data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to add resource' });
    }
  });

  // Chatbot endpoint
  app.post('/api/chatbot', async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'Message is required' });
      }

      // For now, we'll create a simple response system
      // You can replace this with actual AI integration later
      const response = generatePhilosophyResponse(message);
      
      res.json({ response });
    } catch (error) {
      console.error('Chatbot error:', error);
      res.status(500).json({ message: 'Failed to process message' });
    }
  });

  return httpServer;
}
