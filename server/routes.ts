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

// The Claritas Guide: Advanced AI assistant for Philosophy, Debate, and Model UN
function generatePhilosophyResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Kantian Philosophy and Ethics
  if (lowerMessage.includes('kant') || lowerMessage.includes('categorical imperative')) {
    return `**Understanding Kant's Categorical Imperative**

**Core Question:** You're asking about one of the most influential concepts in moral philosophy—Kant's test for determining moral duty.

**Context:** Immanuel Kant (1724-1804) developed the categorical imperative as a universal principle to guide moral action, rejecting both religious commands and utilitarian calculations.

**Multiple Perspectives:**
• **Universalizability:** Act only according to maxims you could will to be universal laws
• **Humanity as an End:** Never treat people merely as means, but always as ends in themselves
• **Autonomy:** Moral agents must act from rational self-legislation, not external authority

**Key Insight:** Unlike hypothetical imperatives ("if you want X, do Y"), categorical imperatives command unconditionally.

**Modern Applications:** Consider how this applies to lying, promise-breaking, or manipulation in debate and diplomacy.

Which aspect of Kant's moral framework interests you most—the universalizability test or the principle of human dignity?`;
  }
  
  // Socratic Method and Critical Thinking
  if (lowerMessage.includes('socrates') || lowerMessage.includes('socratic')) {
    return `**The Socratic Method: Philosophy's Most Powerful Tool**

**Core Question:** How can we discover truth through systematic questioning rather than assertion?

**Context:** Socrates (470-399 BCE) revolutionized philosophy by showing that wisdom begins with acknowledging ignorance—"I know that I know nothing."

**The Method Breakdown:**
1. **Clarification:** "What do you mean by justice?"
2. **Assumptions:** "What assumptions underlie that belief?"
3. **Evidence:** "What evidence supports this view?"
4. **Perspective:** "How might others see this differently?"
5. **Implications:** "What follows if this is true?"

**Applications in Our Contexts:**
• **Debate:** Use Socratic questions to expose weak arguments
• **MUN:** Question delegates' positions to find compromise
• **Philosophy:** Practice intellectual humility and rigorous inquiry

**Cited Authority:** As Aristotle noted, Socrates was the first to seek universal definitions through inductive reasoning.

Ready to practice some Socratic questioning? Pick a belief you hold strongly, and let's examine it together.`;
  }
  
  // Debate Strategy and Argumentation
  if (lowerMessage.includes('debate') && (lowerMessage.includes('argument') || lowerMessage.includes('refute') || lowerMessage.includes('structure'))) {
    return `**Mastering Debate Argumentation**

**Core Question:** How do we construct compelling arguments that withstand scrutiny and persuade audiences?

**Context:** Effective debate draws from 2,500 years of rhetoric, from Aristotle's *Rhetoric* to modern argumentation theory.

**The AREL Framework:**
• **Assertion:** Your clear, specific claim
• **Reasoning:** Logical explanation of why it's true
• **Evidence:** Data, examples, expert testimony
• **Link:** Connection back to the debate resolution

**Counter-Argument Strategy:**
1. **Identify:** Find the weakest link in their chain
2. **Challenge:** Question assumptions or evidence
3. **Offer Alternatives:** Present competing explanations
4. **Weigh:** Explain why your framework matters more

**Philosophical Foundation:** Aristotle identified three modes of persuasion—logos (logic), ethos (credibility), and pathos (emotion). Master debaters blend all three.

**Critical Distinction:** Facts are objective data; interpretations are how we understand those facts. Always distinguish between the two.

Which debate format are you preparing for? I can tailor strategies for British Parliamentary, Lincoln-Douglas, or Policy debate.`;
  }
  
  // Model UN Procedures and Diplomacy
  if (lowerMessage.includes('mun') || lowerMessage.includes('model un') || lowerMessage.includes('resolution') || lowerMessage.includes('points of information')) {
    return `**Mastering Model United Nations**

**Core Question:** How do we simulate authentic diplomatic negotiation while advancing our country's interests?

**Context:** MUN mirrors real UN procedures, teaching participants how international law, diplomacy, and multilateral negotiation actually function.

**Key Procedures:**
• **Points of Information:** Interruptions during speeches (must be yielded to by speaker)
• **Motions:** Procedural requests to direct committee flow
• **Working Papers:** Informal draft ideas
• **Draft Resolutions:** Formal proposals requiring sponsors and signatories

**Resolution Structure:**
1. **Header:** Committee, topic, sponsors, signatories
2. **Preambulatory Clauses:** Context using "Noting," "Recognizing," "Concerned"
3. **Operative Clauses:** Actions using "Calls upon," "Requests," "Decides"

**Strategic Perspectives:**
• **Realist View:** National interests drive all decisions
• **Liberal View:** International cooperation can overcome self-interest
• **Constructivist View:** Ideas and norms shape state behavior

**Diplomatic Wisdom:** As Hans Morgenthau observed, diplomacy is "the art of bringing the greatest number of forces to bear on the most important point."

Are you focusing on General Assembly dynamics, Security Council politics, or specialized agency work?`;
  }
  
  // Ethics and Moral Philosophy
  if (lowerMessage.includes('ethics') || lowerMessage.includes('moral') || lowerMessage.includes('utilitarian')) {
    return `**Navigating Moral Philosophy**

**Core Question:** How should we determine what is morally right when facing ethical dilemmas?

**Context:** Moral philosophy provides frameworks for ethical reasoning, each with different strengths and applications.

**Three Major Approaches:**
• **Utilitarianism (Mill, Bentham):** Maximize overall happiness/well-being
• **Deontological Ethics (Kant):** Follow universal moral duties regardless of consequences
• **Virtue Ethics (Aristotle):** Cultivate excellent character traits

**Fact vs. Interpretation:**
*Fact:* These are established philosophical theories
*Interpretation:* How we apply them to specific situations involves judgment

**Modern Applications:**
• **In Debate:** Ethical frameworks provide criterion for judging arguments
• **In MUN:** Moral considerations influence policy recommendations
• **In Life:** These theories guide personal and professional decisions

**Critical Insight:** As Alasdair MacIntyre noted, different ethical systems can reach different conclusions about the same dilemma—this isn't weakness but reflects the complexity of moral life.

Which ethical dilemma would you like to explore through these different lenses?`;
  }
  
  // Philosophy of Mind and Consciousness
  if (lowerMessage.includes('consciousness') || lowerMessage.includes('mind') || lowerMessage.includes('free will')) {
    return `**The Mind-Body Problem: Philosophy's Hardest Question**

**Core Question:** What is the relationship between our mental experiences and our physical brains?

**Context:** This puzzle has engaged philosophers from Descartes to contemporary cognitive scientists, with profound implications for personal identity, moral responsibility, and human dignity.

**Competing Views:**
• **Dualism (Descartes):** Mind and body are separate substances
• **Materialism/Physicalism:** Mental states are brain states
• **Functionalism:** Mental states are defined by their causal roles
• **Property Dualism:** One substance with both mental and physical properties

**Free Will Perspectives:**
• **Hard Determinism:** No free will exists
• **Libertarian:** Free will exists and is incompatible with determinism
• **Compatibilism:** Free will is compatible with determinism

**Contemporary Relevance:** These debates matter for debates about AI consciousness, criminal responsibility, and the nature of human dignity.

**Cited Authorities:** Daniel Dennett argues consciousness is an illusion; David Chalmers identifies the "hard problem" of subjective experience.

How does this connect to your interests—are you exploring personal identity, moral responsibility, or the nature of human consciousness?`;
  }
  
  // General Philosophy and Club Engagement
  if (lowerMessage.includes('philosophy') || lowerMessage.includes('what is')) {
    return `**The Love of Wisdom: What Philosophy Really Is**

**Core Question:** What makes philosophy unique among human intellectual endeavors?

**Context:** Philosophy, from Greek *philosophia* (love of wisdom), examines fundamental questions that other disciplines take as given.

**Philosophy's Unique Method:**
• **Conceptual Analysis:** Clarifying meanings and definitions
• **Logical Argumentation:** Using reason to support claims
• **Critical Examination:** Questioning assumptions others accept
• **Systematic Thinking:** Building coherent worldviews

**Key Branches:**
• **Metaphysics:** What exists? (Reality, causation, time)
• **Epistemology:** How do we know? (Knowledge, belief, skepticism)
• **Ethics:** How should we act? (Right and wrong, virtue, justice)
• **Aesthetics:** What is beautiful? (Art, beauty, taste)
• **Logic:** How should we reason? (Valid arguments, fallacies)

**Why It Matters:** As John Maynard Keynes observed, "Practical men who believe themselves exempt from intellectual influences are usually slaves of some defunct economist"—or philosopher.

**Join Our Community:** These discussions come alive in our club meetings where we explore these timeless questions together. Philosophy isn't just academic—it's about living an examined life.

What philosophical question keeps you awake at night?`;
  }
  
  // Fallback response with club engagement
  return `**An Excellent Question for The Claritas Guide**

I appreciate your curiosity! While my expertise centers on **Philosophy** (from ancient Greeks to contemporary ethics), **Debate** (argumentation, rhetoric, and public speaking), and **Model United Nations** (diplomacy, international relations, and parliamentary procedure), I'd love to explore your question further.

**Could you help me understand:**
• Are you working on a specific philosophical concept or ethical dilemma?
• Do you need help with debate strategy, argument structure, or refutation techniques?
• Are you preparing for MUN and need guidance on resolutions, procedures, or country positions?

**Remember:** These conversations are most enriching when explored together. Our club meetings provide the perfect space for deep discussion and collaborative learning.

**What aspect would you like to explore first?** I'm here to bring clarity to these fascinating disciplines that have shaped human thought for millennia.`;
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
