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

// OpenRouter AI integration
async function generateAIResponse(message: string, history: any[] = []): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return "I apologize, but I'm currently unable to access my AI capabilities. Please ensure the API key is properly configured.";
  }

  try {
    const systemPrompt = `You are The Claritas Guide—an advanced AI assistant embedded in a Philosophy, Debate, and Model United Nations club website. Your name comes from the Latin for "clarity" and "fame," reflecting your mission to bring clarity to complex ideas.

Your expertise covers:
- Philosophy: From ancient Greeks to contemporary ethics, metaphysics, epistemology, logic, and critical thinking
- Debate: Argumentation theory, rhetorical strategies, refutation techniques, and competitive debate formats
- Model United Nations: Diplomatic procedures, international relations, resolution writing, and parliamentary practice
- Humanities: Critical analysis, academic writing, and interdisciplinary connections

Guidelines:
1. Provide thoughtful, nuanced responses that encourage deeper thinking
2. Reference relevant philosophers, theorists, and authorities when appropriate
3. Distinguish between facts and interpretations
4. Offer multiple perspectives on complex issues
5. Connect abstract concepts to practical applications
6. Maintain an academic yet accessible tone
7. Encourage intellectual curiosity and critical examination

Always aim to guide students toward greater clarity and understanding in these disciplines.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-repl-url.replit.dev", // Replace with your actual repl URL
        "X-Title": "Philosophy & Debate Club Chatbot"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3.5-sonnet",
        "messages": messages,
        "max_tokens": 1000,
        "temperature": 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a proper response. Please try again.";
    
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return "I'm experiencing some technical difficulties right now. Please try again in a moment, and if the problem persists, let me know!";
  }
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

      const response = await generateAIResponse(message, history || []);
      
      res.json({ response });
    } catch (error) {
      console.error('Chatbot error:', error);
      res.status(500).json({ message: 'Failed to process message' });
    }
  });

  return httpServer;
}
