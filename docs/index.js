var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  contactMessages: () => contactMessages,
  events: () => events,
  galleryImages: () => galleryImages,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertEventSchema: () => insertEventSchema,
  insertGalleryImageSchema: () => insertGalleryImageSchema,
  insertMemberSchema: () => insertMemberSchema,
  insertResourceLinkSchema: () => insertResourceLinkSchema,
  insertStudentSchema: () => insertStudentSchema,
  insertUserSchema: () => insertUserSchema,
  members: () => members,
  resourceLinks: () => resourceLinks,
  students: () => students,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull()
  // "philosophy", "debate", or "model-un"
});
var members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  focus: text("focus").notNull(),
  // "Philosophy", "Debate", or "Model UN"
  imageUrl: text("imageUrl")
});
var students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  graduationYear: text("graduation_year"),
  major: text("major"),
  interests: text("interests").array(),
  // Array of interests: "philosophy", "debate", "model-un"
  joinDate: timestamp("join_date").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true)
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  // "philosophy", "debate", or "model-un"
  date: text("date").notNull(),
  authorId: integer("author_id").notNull(),
  imageUrl: text("imageUrl")
});
var galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  imageUrl: text("imageUrl").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var resourceLinks = pgTable("resource_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  // "philosophy", "debate", or "model-un"
  type: text("type").notNull()
  // "article", "video", "document", "website"
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  time: true,
  location: true,
  category: true
});
var insertMemberSchema = createInsertSchema(members).pick({
  name: true,
  role: true,
  bio: true,
  focus: true,
  imageUrl: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  date: true,
  authorId: true,
  imageUrl: true
});
var insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  date: true,
  imageUrl: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var insertStudentSchema = createInsertSchema(students).pick({
  name: true,
  email: true,
  phone: true,
  graduationYear: true,
  major: true,
  interests: true,
  isActive: true
});
var insertResourceLinkSchema = createInsertSchema(resourceLinks).pick({
  title: true,
  url: true,
  description: true,
  category: true,
  type: true
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/storage.ts
import { eq } from "drizzle-orm";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
var MemStorage = class {
  users;
  eventsList;
  membersList;
  blogPostsList;
  galleryImagesList;
  contactMessagesList;
  studentsList;
  resourceLinksList;
  // IDs for auto-increment
  userCurrentId;
  eventCurrentId;
  memberCurrentId;
  blogPostCurrentId;
  galleryImageCurrentId;
  contactMessageCurrentId;
  studentCurrentId;
  resourceLinkCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.eventsList = /* @__PURE__ */ new Map();
    this.membersList = /* @__PURE__ */ new Map();
    this.blogPostsList = /* @__PURE__ */ new Map();
    this.galleryImagesList = /* @__PURE__ */ new Map();
    this.contactMessagesList = /* @__PURE__ */ new Map();
    this.studentsList = /* @__PURE__ */ new Map();
    this.resourceLinksList = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
    this.memberCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.galleryImageCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.studentCurrentId = 1;
    this.resourceLinkCurrentId = 1;
    this.initializeSampleData();
  }
  // Initialize with sample data for development
  initializeSampleData() {
    this.createMember({
      name: "Mateo Pirela Pulido",
      role: "Club Co-President: Founder",
      bio: "Lover of philosophy. Has participated in one national philosophy competition.",
      focus: "Philosophy, critical thinking",
      imageUrl: "/images/mateo.png"
    });
    this.createMember({
      name: "Juan Carlos Gonzalez",
      role: "Club Director",
      bio: "Professor of Philosophy and founder of the club initiative",
      focus: "expert in philosophy and debate",
      imageUrl: "/images/juan.png"
    });
    this.createMember({
      name: "Daniela Rodriguez",
      role: "Club Co-president",
      bio: "loves debate, committed to social causes",
      focus: "Debate and social skills",
      imageUrl: "/images/daniela.png"
    });
    this.createBlogPost({
      title: "Revoluci\xF3n Industrial y Antropoceno: Los Efectos de los Avances Tecnol\xF3gicos.",
      content: `Revoluci\xF3n Industrial y Antropoceno: Los Efectos de los Avances Tecnol\xF3gicos.
En la actualidad, las problem\xE1ticas ambientales se encuentran intr\xEDnsecamente relacionadas con los avances tecnol\xF3gicos que datan en la revoluci\xF3n industrial, desde 1780 hasta 1850, los cuales han determinado una crisis que permea en la preocupaci\xF3n de los gobiernos y los activistas ambientales, cuyos planteamientos derivan discusiones de suma relevancia tanto en el marco pol\xEDtico, como en las perspectivas sociales que promueven la concientizaci\xF3n de las acciones humanas frente a este fen\xF3meno. En el presente texto, se establece la problem\xE1tica central del antropoceno para exponer dos argumentos que se sustentan desde fuentes acad\xE9micas.
El concepto clave denominado Antropoceno constituye una \xE9poca geol\xF3gica caracterizada por la dominancia del impacto humano sobre el planeta, que seg\xFAn Cuomo. (2017) se refiere \u201Cal hecho de que los seres humanos (anthropos) influyen, como nunca antes en la historia, en los diferentes sistemas existentes en la Tierra, as\xED como en otras especies. Esto produce cambios impredecibles y perdurables\u201D (p.4). La relaci\xF3n de Cuomo con la revoluci\xF3n industrial del siglo XVIII hace pensar que, la utilizaci\xF3n de maquinarias para la realizaci\xF3n de los trabajos crea una demanda insaciable de recursos energ\xE9ticos, que para esta \xE9poca solo se pod\xEDa realizar con la extracci\xF3n de energ\xEDa f\xF3sil, la que proviene de la quema de combustibles como el carb\xF3n y el petr\xF3leo, este procedimiento genera los llamados gases de efecto invernadero, como lo son el di\xF3xido de carbono y el metano que act\xFAan como una manta que recubre la tierra, y retiene el calor solar, el cual produce el aumento de las temperaturas.
Desde la perspectiva personal, plantear la problem\xE1tica permite en primera instancia, citar a Santayana. (1905). "Los que no pueden recordar el pasado est\xE1n condenados a repetirlo"(p.44). Lo cual significa, que como pensaba Michel Foucault, Karl Marx, diversos soci\xF3logos y economistas, el entendimiento de la historia, y los hechos que la marcaron es fundamental para la comprensi\xF3n de las problem\xE1ticas contempor\xE1neas y el enfrentamiento de estas mismas. Por lo tanto, ubicarse desde el an\xE1lisis hist\xF3rico en el desarrollo de la problem\xE1tica ambiental actual, en comparaci\xF3n con los avances industriales y tecnol\xF3gicos determina que los efectos de la revoluci\xF3n industrial influyen negativamente en la producci\xF3n de gases de efecto invernadero, debido, a la aparici\xF3n de las maquinarias industriales y el inter\xE9s empresarial por el uso desmedido de recursos naturales.
En primer lugar, la aparici\xF3n de las maquinarias industriales que nacen debido a la abismal demanda de energ\xEDa presentada como consecuencia de la revoluci\xF3n industrial y el nuevo sistema econ\xF3mico inciden negativamente, as\xED como lo se\xF1ala Serratos (2021) Plantea que necesitamos cambiar el sistema econ\xF3mico, que nos vende la idea de que es necesario destruir la naturaleza para obtener un bienestar.  Al respecto conviene decir que seg\xFAn la Organizaci\xF3n de las Naciones Unidas (ONU), en el informe del Intergovernmental Panel on Climate Change (IPCC, 2021) el ser humano es responsable del calentamiento global de los \xFAltimos 200 a\xF1os, donde se puede ver que la temperatura media de la tierra es 1,1\xBAC m\xE1s elevada que a finales del siglo XIX. Ahora bien, paralelamente al incremento masivo de la producci\xF3n de gases de efecto invernadero, se ha registrado, un hecho hist\xF3rico que marc\xF3 un punto de inflexi\xF3n en la producci\xF3n de estos nocivos gases, que es la hegemonizaci\xF3n mundial del sistema capitalista.
 A pesar de que se est\xE1n creando nuevos mecanismos para la sustentaci\xF3n de las necesidades energ\xE9ticas, como son las energ\xEDas limpias y renovables, se est\xE1 pasando por alto la ra\xEDz de la problem\xE1tica, en la que encontramos como consecuencia, no solo la demanda excesiva de energ\xEDa, sino en general de los recursos naturales, que se explotan de manera salvaje en aquellos pa\xEDses que cuentan con estos.
Seg\xFAn los datos publicados en la revista cient\xEDfica The Lancet, del informe internacional presentado por La Universidad Aut\xF3noma de Barcelona, desde 1970 hasta 2017 Estados Unidos representa el 27% de uso excesivo de materiales en el mundo, seguido de este la UE con un 25% (incluyendo a Reino Unido). Para que se pueda comprender lo preocupante de estas cifras, hay que tener en cuenta que se han extra\xEDdo en total 2.500 millones de toneladas de recursos naturales en todo el planeta, ahora bien m\xE1s de la mitad del uso de estos recursos recae, en los estados mencionados con anterioridad. Y, que al sumar los indicadores de todos los pa\xEDses del sur global, o  sea Am\xE9rica Latina, Caribe, \xC1frica, Medio Oriente y gran parte de Asia, \xFAnicamente representan el 8% de uso excesivo de estos materiales.
Al respecto se se\xF1ala que la raz\xF3n principal por la que existe este desfase entre Estados Unidos y un gran n\xFAmero de pa\xEDses, en la utilizaci\xF3n de recursos naturales, a priori, es debido al modelo capitalista donde la propiedad privada y el supuesto libre mercado son el eje de la econom\xEDa, en el cual es necesaria la extracci\xF3n masiva de los recursos para poder cumplir con el ideal planteado en este sistema, que es el crecimiento exponencial e infinito de la econom\xEDa, pero que no prevalece el medio ambiente en la ecuaci\xF3n de crecimiento exponencial econ\xF3mico, ya que, aunque exista la posibilidad de crecer la econom\xEDa de manera infinita, los recursos naturales con los que contamos son limitados.
        Retomando la tesis planteada en este escrito con los argumentos desarrollados, este ensayo no pretende agotar la discusi\xF3n ni mucho menos suministrar una respuesta absoluta, pero al tiempo nos posiciona ante la necesidad imperativa de mantener abierta la reflexi\xF3n filos\xF3fica desde la permanente interrogaci\xF3n para identificar la relaci\xF3n entre la crisis ambiental, la aparici\xF3n de las maquinarias industriales y el inter\xE9s empresarial por el uso desmedido de recursos naturales, con el objetivo de proponer un camino que lleve a la soluci\xF3n de la situaci\xF3n problema con el prop\xF3sito de reestructurar el sistema pol\xEDtico y socioecon\xF3mico, dando como manifiesto la necesidad de mantener la reflexi\xF3n filos\xF3fica alrededor de la pregunta como la luz que ilumine el sendero a transitar en el Antropoceno.
        Para finalizar se plantean unas interrogantes que permitir\xE1n la reflexi\xF3n con respecto a la problem\xE1tica tratada en este ensayo:
\xBFPor qu\xE9 se debe promover la concientizaci\xF3n ambiental?
\xBFCu\xE1les son las medidas inmediatas que se deben de tomar por parte del ciudadano promedio para enfrentar la crisis clim\xE1tica?
\xBFC\xF3mo se puede contribuir desde el seno del hogar y familiar a la concientizaci\xF3n de la problem\xE1tica ambiental?

Referencias

Cuomo, C. (2017). Against the Idea of an Anthropocene Epoch: Ethical, Political and Scientific Concerns. Biogeosystem Technique, 4(1), 4\u20138.   https://doi.org/10.13187/bgt.2017.1.4     
Serratos, F. (2020). El capitaloceno.  Universidad Nacional Aut\xF3noma de M\xE9xico
United Nations [UN]. (s/f). \xBFQu\xE9 es el cambio clim\xE1tico? | Naciones Unidas., de https://www.un.org/es/climatechange/what-is-climate-change
Hickel, J., O'Neill, D. W., Fanning, A. L., & Zoomkawala, H. (2022). National responsibility for ecological breakdown: a fair-shares assessment of resource use, 1970\u20132017. The Lancet. Planetary Health, 6(4), e342\u2013e349. https://doi.org/10.1016/S2542-5196(22)00044-4`,
      excerpt: "Explorando los conceptos clave que caracterizan el antropoceno.",
      category: "filosofia",
      date: "10 abril, 2024",
      imageUrl: "/images/antropoceno.webp",
      authorId: 1
    });
    this.createBlogPost({
      title: "La pesadilla moderna",
      content: `La pesadilla moderna

Hace mucho tiempo, alrededor del 300 a.c, se encontraba Di\xF3genes de Sinope en Atenas reposando debajo de la sombra  de un \xE1rbol de olivo. Tras unos minutos ah\xED, cierra sus ojos y cae en un sue\xF1o profundo. Despu\xE9s de cierto tiempo, Di\xF3genes despierta, pero al levantarse queda anonadado. Se encontraba en un lugar distinto al que hab\xEDa quedado dormido. Al mirar a su alrededor se da cuenta que no solo no estaba debajo del \xE1rbol de olivo, se encontraba en un ambiente que nunca hab\xEDa visto. Todo era muy distinto a todo lo que hab\xEDa presenciado a lo largo de su vida. Di\xF3genes se encontraba en un ambiente turbio y oscuro, sobre cargado de edificaciones, y lleno de unos objetos met\xE1licos de gran magnitud que dentro llevaban personas las cuales \xE9l desconoc\xEDa. Igualmente, al dar una vuelta notaba que hab\xEDa una gran multitud de personas, todas llevaban unas vestiduras extra\xF1as, llevando la ropa superior separada a la inferior, portando en los pies unas extra\xF1as coberturas de tela amarradas por un cord\xF3n. La gente en la calle caminaba como muy de prisa, no se deten\xEDan a reflexionar y platicar el uno con el otro, algunos incluso portaban unos objetos en las orejas que los aislaban de su alrededor. Pero lo que m\xE1s le desconcertaba era que a pesar de haber recorrido el lugar por un rato, la cantidad de \xE1rboles que hab\xEDa visto era mucho menor a lo que \xE9l estaba acostumbrado a ver en Atenas.

Di\xF3genes se sent\xEDa perdido, pero al mismo tiempo no pod\xEDa guardar su curiosidad.
\xBFEn d\xF3nde se encontraba? \xBFQu\xE9 estaba sucediendo y por qu\xE9 todo era tan distinto?
Al cabo de un rato de estar navegando a la deriva por las calles que no parec\xEDan ser Grecia, la sed lo invadi\xF3, por lo que decidi\xF3 entrar a un sal\xF3n del que hab\xEDa observado a varias personas entrar y salir con bebidas. Cada vez era m\xE1s impresionante lo que observaba. Esta vez, el espacio se le hac\xEDa m\xE1s reconocido. De hecho, ya ve\xEDa personas charlar unas con las otras, sin embargo, algunas sosten\xEDan en sus manos un extra\xF1o objeto peque\xF1o y resplandeciente, que parec\xEDan hacerlos re\xEDr.
Absorto en sus pensamientos, alguien lo tropieza y riega sobre su \xFAnica prenda, una bebida, lo que causa que ahora tenga una gran mancha marr\xF3n sobre s\xED. Sin prestar mucha atenci\xF3n sobre lo reci\xE9n ocurrido y sin decir una sola palabra, sale del lugar. Empieza a adaptarse a todo y a dejar de darle mucha importancia. Despu\xE9s de salir, nota a lo lejos lo que parece ser un hombre recostado sobre el piso, utilizando pocas prendas y sin muchas pertenencias a su alrededor. Del rostro de Di\xF3genes brota lo que parece ser un rastro de alegr\xEDa, pues piensa en que por fin ha encontrado un verdadero hombre, desapegado a cualquier tipo de cosa material. Sorprendido, se acerca para sentarse al lado de uno de sus iguales. El hombre, aunque extra\xF1ado, observa el aspecto de Di\xF3genes y le comenta: - La situaci\xF3n cada vez es m\xE1s dif\xEDcil, \xBFcierto? Aparte, con estas calores, ya no solo es dif\xEDcil sustentarse y sobrevivir, pero encontrarle un lado agradable a la vida.- Di\xF3genes, ahora confundido por las palabras del que pocas prendas lleva, le dice -\xBFA qu\xE9 situaci\xF3n se refiere con tanto aborrecimiento de la vida?- Posterior a su pregunta y notando todo el desconcierto de Di\xF3genes, el hombre, sin cuestionar todo su desconocimiento ante el mundo actual, le explica sobre los problemas que enfrenta y produce la humanidad, entre ellos, c\xF3mo este est\xE1 en v\xEDa de destruir su propio hogar, el planeta tierra. Le habla de c\xF3mo, a pesar de no siempre haberse encontrado en la situaci\xF3n en la que est\xE1, hubieron varios acontecimientos que llevaron a que ya no poseyera lugar donde vivir ni cosas qu\xE9 tener.

Para este punto, era claro para Di\xF3genes reconocer que se encontraba en un tiempo distinto al que pertenece. No ten\xEDa claro qu\xE9 hab\xEDa hecho posible el que se encontrara en otro momento de la humanidad, pero era evidente lo poco que hab\xEDa cambiado la insistencia de las personas por crear y poseer cada vez m\xE1s. Le era dif\xEDcil entender y procesar todo lo que ocurr\xEDa, m\xE1s a\xFAn, tom\xF3 la decisi\xF3n de enterarse de m\xE1s, puesto que, de todo lo que hab\xEDa escuchado del que le hab\xEDa contado ser un 'indigente', le preocup\xF3 m\xE1s el hecho que mencionara que las personas poco a poco y con todas sus invenciones, se encontraran destruyendo el lugar que habitamos todas las personas, que ahora se conoce como 'planeta tierra'. Di\xF3genes se hab\xEDa propuesto entender todo lo que pasaba en ese momento, lo que, a pesar de no ser una acci\xF3n que tomar\xEDa el fil\xF3sofo en su cotidianidad, entend\xEDa que era necesario para poder seguir existiendo.

Hab\xEDan pasado unos d\xEDas desde que el fil\xF3sofo c\xEDnico hab\xEDa llegado por primera vez al mundo actual. A pesar de tener que adaptarse a este, su pensamiento sobre la vida no hab\xEDa cambiado tanto con relaci\xF3n a c\xF3mo viv\xEDa antes de conocer el nuevo mundo. Conservaba parte del estilo de vida que llevaba antes, pues hab\xEDa aprendido que no solo se proh\xEDben ciertos comportamientos al margen p\xFAblico, sino que tambi\xE9n habr\xEDan reprendas en contra de \xE9l si no cumpl\xEDa con el 'actuar debido'. Pensaba en aquella Grecia que tanto criticaba y que sin embargo no se comparaba con todo lo que pensaba de la actual. Cada vez aumentaba su incomprensi\xF3n del actuar del ser humano, que, por lo que hab\xEDa estado leyendo en las bibliotecas que milagrosamente le permit\xEDan la entrada, act\xFAa en detrimento de s\xED mismo y el ambiente en el que se encuentra. As\xED, las guerras que estaban por venir sobre su tiempo no solo acabar\xEDan con la vida de las personas, pero tambi\xE9n afectar\xEDa la vida de la naturaleza y todos los animales que se encuentran en ella, que por razones atribu\xEDdas a explicaciones complicadas sobre c\xF3mo una genera a la otra, todo conclu\xEDa en que las personas crean e inventan lo suficiente como para tener el poder de acabar con el \xFAnico lugar que tienen para vivir. \xBFQu\xE9 era eso de las m\xE1quinas?  \xBFPor qu\xE9 le era tan necesario al ser humano, actuar para obtener m\xE1s, sin ser esto lo que les dar\xEDa felicidad? Nunca comprendieron que la felicidad se encontraba en el desapego y en lugar de eso, se alejaban de su naturaleza y al final, su apego por las cosas superfluas, aquello que se supon\xEDa les iba a traer alegr\xEDa sobre ellos mismos, causar\xE1 su propia destrucci\xF3n.

Todas estas cuestiones lo inquietaban y mientras m\xE1s conoc\xEDa sobre el actuar del ser humano, menos dudaba en exclamar y pregonar todos sus pensamientos en p\xFAblico. Las plazas, los parques, las calles, se convert\xEDan cada d\xEDa en escenario de todas sus quejas. La gente se aglomeraba o lo ignoraban. Aun as\xED, de momento, nadie reconoc\xEDa el por qu\xE9 de su gran similitud con el fil\xF3sofo griego Di\xF3genes de Sinope. Aunque, algunos tantos habr\xE1n divagado en que se basaba y eleg\xEDa vivir como lo hac\xEDa el antiguo c\xEDnico.

Di\xF3genes hab\xEDa dejado de notar la extra\xF1eza de vivir en el tiempo de la actual Atenas, hasta que un d\xEDa despert\xF3 sin volver a reconocer el lugar en el que estaba. Esta vez, el levantarse le provoc\xF3 l\xE1grimas y gran estruendo aflig\xEDa su coraz\xF3n. Pues, observaba cautelosamente el nuevo lugar que le rodeaba y no era visible ni un solo \xE1rbol a su alrededor. El calor era a\xFAn m\xE1s contundente que la anterior vez que hab\xEDa despertado sin entender el espacio en el que se encontraba y ya ten\xEDa presente la raz\xF3n del por qu\xE9. Cre\xEDa intuir qu\xE9 pasaba y no pod\xEDa creer la nueva realidad. Su desconcierto fue tal que al siquiera acercarse a las masas y enterarse que ten\xEDa la raz\xF3n, no tuvo remedio que elegir dormir esperando a despertar de la pesadilla a\xFAn m\xE1s contundente. As\xED que regresa a su nuevo punto de partida y vuelve a cerrar sus ojos. Fue ah\xED cuando comprendi\xF3 que el ser humano no pudo recuperar su hogar porque nunca ces\xF3 ni dej\xF3 de lado sus ansias de poseer m\xE1s.

Di\xF3genes se despierta de su \xFAltima siesta. Todav\xEDa sin abrir sus ojos, escucha el canto de los p\xE1jaros y el olor de la grama que sus manos tocan. Lentamente abre sus ojos, y siente una hoja caer sobre su cara, por encima de \xE9l se encuentra el \xE1rbol de olivo. Ve sus prendas y encuentra una vieja mancha marr\xF3n impregnada sobre la tela. Ya sabe la importancia del remedio del ser humano.

Teniendo en cuenta la idea de Antropoceno, \xBFPensar sobre el futuro se constituye en una utop\xEDa o en una distop\xEDa?`,
      excerpt: "Una reflexi\xF3n filos\xF3fica a trav\xE9s de los ojos de Di\xF3genes de Sinope.",
      category: "filosofia",
      date: "10 abril, 2024",
      imageUrl: "/images/diogenes.gif",
      authorId: 1
    });
    this.createBlogPost({
      title: "\xBFIzquierda o Derecha?: Filosof\xEDa de la lucha de poderes",
      content: `\xBFIzquierda o Derecha?: Filosof\xEDa de la lucha de poderes
Desde tiempos que hoy parecen lejanos, se hablaba de divisi\xF3n de poderes, de lucha
incesante por dominar, por vencer; actualmente seguimos viendo como la polarizaci\xF3n nubla
perspectivas. Los or\xEDgenes de estos t\xE9rminos ideol\xF3gicos, derecha e izquierda, datan
espec\xEDficamente en 1789, Europa, la revoluci\xF3n francesa y la convocatoria de la Asamblea de los
Estados Generales, donde claramente los miembros de esta al querer demostrar su posici\xF3n no solo
ideol\xF3gica sino tambi\xE9n a favor o no del rey, se asignaron puestos. A la derecha se sentaban los
que estaban de acuerdo con el monarca Luis XVI de Francia y sus ideales, entre tanto que los
revolucionarios lo hac\xEDan a la izquierda.
Mientras que en Europa ser de derecha habla de \u201Cconservadurismo\u201D y ser de izquierda
implica ser \u201Csocialista\u201D, en Estados Unidos los de izquierda son \u201Cdem\xF3cratas\u201D, as\xED que es clave
destacar que no en todas las partes del mundo ser de izquierda o de derecha tiene la misma
connotaci\xF3n, pero lo que s\xED es igual para todas las culturas, idiomas o sistemas pol\xEDticos es el
significado de la m\xE1xima \u201CDivide y vencer\xE1s\u201D; frase del com\xFAn a la cual no se le atribuye autor
pero si bien tiene raz\xF3n, en la obra, El arte de la guerra, se supo ampliar de la mejor manera, ya
que Sun Tzu (2023) se\xF1ala que \u201Cel control de una fuerza grande es el mismo principio que el
control de unos pocos hombres: se trata simplemente de dividir sus n\xFAmeros\u201D. Ahora el
interrogante es \xBFEl que nosotros como pueblo elijamos un bando u otro no es solo una estrategia
de las elites para dividirnos y as\xED tener control de las masas?
Seg\xFAn Kofman (2006), cuando se nos obliga a pensar en t\xE9rminos estrictamente opuestos,
como extremos irreconciliables, perdemos la oportunidad de encontrar soluciones m\xE1s complejas
y efectivas, ya que esta forma de pensar limita el an\xE1lisis y fomenta respuestas simplistas; lo que
puede explicar el por qu\xE9 las personas actualmente se dejan llevar por la polarizaci\xF3n y no son

cr\xEDticas con respecto a personajes pol\xEDticos s\xF3lo porque estos son de la bancada que los representa,
sin detenerse a pensar si realmente estas personas los representan.
Estamos como sociedad dist\xF3pica y abrumada siempre buscando donde pertenecer y nos
entregamos a un extremo o al otro, creyendo que esto ser\xE1 la soluci\xF3n al problema sin entender
que caemos en la trampa del \u201Cdivide y vencer\xE1s\u201D: porque al estar en discordia, el pueblo nunca
gana. Dejamos que, los poderosos, los que rigen, controlen, porque nosotros estamos ocupados
poniendo etiquetas y dividi\xE9ndonos como sociedad cada vez m\xE1s, lo que hace que las voces pierdan
fuerza. Somos culpables de una fragmentaci\xF3n social que, dentro de poco, ya no tendr\xE1 reversa.
Claro ejemplo de que la polarizaci\xF3n pol\xEDtica y la escogencia de \u201Cbandos\u201D distorsiona
nuestra visi\xF3n pol\xEDtica e incluso nuestra humanidad es el caso del atentado del Congresista y
precandidato presidencial Miguel Uribe Turbay el pasado 7 de junio del presente a\xF1o. Mientras
que \xE9l se debat\xEDa entre la vida y la muerte, estaban muchos colombianos creando teor\xEDas y
afirmando rumores por plataformas como X o Facebook; personas de izquierda incluso afirmaban
que era un autoatentado y personas de derecha alegando que era un intento de asesinato que ven\xEDa
de parte de la izquierda y su gobierno, todos sin pruebas.
\xBFRealmente el culpar a una ideolog\xEDa u otra pod\xEDa subsanar lo ocurrido? Rotundamente no,
pero mientras que nosotros est\xE1bamos indolentes eligiendo posiciones a la derecha o a la izquierda
del rey como en 1789, en Colombia, 2025, segu\xEDa habiendo desigualdad social, los \xEDndices de
pobreza aumentaban, la violencia e inseguridad local segu\xEDa haci\xE9ndose notar y el candidato segu\xEDa
en cama.
Es tiempo de entender que el dividirnos no traer\xE1 ning\xFAn tipo de \xE9xito, que, si queremos
salvar nuestra naci\xF3n, la uni\xF3n hace la fuerza. Impedir que se pierda el poder que tenemos como
pueblo, fuerte y extenso, es nuestro deber como ciudadanos pensantes. Construir un futuro ut\xF3pico

en el que la fragmentaci\xF3n social no sea una realidad, oponerse a que sea utilizada como estrategia
por el poder dominante para evitar la formaci\xF3n de mayor\xEDas hegem\xF3nicas que mantienen la
sociedad dividida. Es tiempo de ser un solo pueblo, y mirar hacia el frente, a nuestro presente y
nuestro futuro: no a la derecha, ni a la izquierda.

Referencias

LW. (2024, noviembre 3). Son de izquierda y derecha? Que son los dem\xF3cratas y
republicanos en USA. Marca.
https://www.marca.com/mx/actualidad/2024/11/03/6727ee87e2704e36518b4583.html

Sadurn\xED, J. M. (2012, noviembre 16). La Revoluci\xF3n Francesa: el fin del Antiguo R\xE9gimen.
National geographic.
https://historia.nationalgeographic.com.es/a/revolucion-francesa-fin-antiguo-regimen-2_6774

Sun Tzu. (2023). El arte de la guerra (A. Galvany, Trad.). Editorial Trotta. (Trabajo original
del siglo IV a.C.)

Kofman, F. (2006). Conscious business: How to build value through values. Harvard
Business Review Press.`,
      excerpt: "Reflexion acerca de la polarizacion politica contemporanea.",
      date: "12 abril, 2025",
      imageUrl: "/images/politics.jpg",
      authorId: 1
    });
    this.createGalleryImage({
      title: "AISMUN",
      date: "2025",
      imageUrl: "/images/aismun.png"
    });
    this.createGalleryImage({
      title: "Marcemun premios",
      date: "2025",
      imageUrl: "/images/marcemun-premios.png"
    });
    this.createGalleryImage({
      title: "AISMUN Comission",
      date: "2025",
      imageUrl: "/images/aismun-todos.png"
    });
    this.createGalleryImage({
      title: "OCF",
      date: "2024",
      imageUrl: "/images/ocf.png"
    });
    this.createGalleryImage({
      title: "Un Cafe Con Sofia",
      date: "2024",
      imageUrl: "/images/un-cafe-con-sofia.png"
    });
    this.createGalleryImage({
      title: "MUNUN",
      date: "2024",
      imageUrl: "/images/munun.png"
    });
    this.createGalleryImage({
      title: "OCF",
      date: "2024",
      imageUrl: "/images/ocftodos.webp"
    });
  }
  // User operations (existing)
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Event operations
  async getAllEvents() {
    return Array.from(this.eventsList.values());
  }
  async getEvent(id) {
    return this.eventsList.get(id);
  }
  async createEvent(insertEvent) {
    const id = this.eventCurrentId++;
    const event = { ...insertEvent, id };
    this.eventsList.set(id, event);
    return event;
  }
  // Member operations
  async getAllMembers() {
    return Array.from(this.membersList.values());
  }
  async getMember(id) {
    return this.membersList.get(id);
  }
  async createMember(insertMember) {
    const id = this.memberCurrentId++;
    const member = {
      ...insertMember,
      id,
      imageUrl: insertMember.imageUrl || null
    };
    this.membersList.set(id, member);
    return member;
  }
  // Blog post operations
  async getAllBlogPosts() {
    return Array.from(this.blogPostsList.values());
  }
  async getBlogPost(id) {
    return this.blogPostsList.get(id);
  }
  async createBlogPost(insertBlogPost) {
    const id = this.blogPostCurrentId++;
    const blogPost = {
      ...insertBlogPost,
      id,
      imageUrl: insertBlogPost.imageUrl || null
    };
    this.blogPostsList.set(id, blogPost);
    return blogPost;
  }
  // Gallery image operations
  async getAllGalleryImages() {
    return Array.from(this.galleryImagesList.values());
  }
  async getGalleryImage(id) {
    return this.galleryImagesList.get(id);
  }
  async createGalleryImage(insertGalleryImage) {
    const id = this.galleryImageCurrentId++;
    const galleryImage = { ...insertGalleryImage, id };
    this.galleryImagesList.set(id, galleryImage);
    return galleryImage;
  }
  // Contact message operations
  async getAllContactMessages() {
    return Array.from(this.contactMessagesList.values());
  }
  async getContactMessage(id) {
    return this.contactMessagesList.get(id);
  }
  async createContactMessage(insertContactMessage) {
    const id = this.contactMessageCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const contactMessage = { ...insertContactMessage, id, createdAt: now };
    this.contactMessagesList.set(id, contactMessage);
    return contactMessage;
  }
  // Student repository operations
  async getAllStudents() {
    return Array.from(this.studentsList.values());
  }
  async getStudent(id) {
    return this.studentsList.get(id);
  }
  async getStudentByEmail(email) {
    return Array.from(this.studentsList.values()).find(
      (student) => student.email === email
    );
  }
  async createStudent(insertStudent) {
    const id = this.studentCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const student = {
      ...insertStudent,
      id,
      joinDate: now,
      isActive: insertStudent.isActive !== void 0 ? insertStudent.isActive : true,
      phone: insertStudent.phone || null,
      graduationYear: insertStudent.graduationYear || null,
      major: insertStudent.major || null,
      interests: insertStudent.interests || []
    };
    this.studentsList.set(id, student);
    return student;
  }
  // Resource link operations
  async getAllResourceLinks() {
    return Array.from(this.resourceLinksList.values());
  }
  async getResourceLink(id) {
    return this.resourceLinksList.get(id);
  }
  async getResourceLinksByCategory(category) {
    return Array.from(this.resourceLinksList.values()).filter(
      (link) => link.category === category
    );
  }
  async createResourceLink(insertResourceLink) {
    const id = this.resourceLinkCurrentId++;
    const resourceLink = {
      ...insertResourceLink,
      id,
      description: insertResourceLink.description || null
    };
    this.resourceLinksList.set(id, resourceLink);
    return resourceLink;
  }
};
var initializeResourceLinks = async (storage2) => {
  await storage2.createResourceLink({
    title: "Stanford Encyclopedia of Philosophy",
    url: "https://plato.stanford.edu/",
    description: "An authoritative encyclopedia of philosophy with in-depth articles written by experts, covering all areas of philosophy.",
    category: "philosophy",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "Philosophy Now",
    url: "https://philosophynow.org/",
    description: "A magazine for everyone interested in ideas. Contains articles on all aspects of Western philosophy, including contemporary issues.",
    category: "philosophy",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "The Partially Examined Life",
    url: "https://partiallyexaminedlife.com/",
    description: "A philosophy podcast by some guys who were at one point set on doing philosophy for a living but then thought better of it.",
    category: "philosophy",
    type: "podcast"
  });
  await storage2.createResourceLink({
    title: "Crash Course Philosophy",
    url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR",
    description: "A beginner-friendly video series covering major philosophical concepts and figures throughout history.",
    category: "philosophy",
    type: "video"
  });
  await storage2.createResourceLink({
    title: "Fernando Millares",
    url: "https://youtube.com/@fermiralles?si=2u2tCzwp7vkCBGdU",
    description: "Comprehensive guide to the AREL method (Assertion, Reasoning, Evidence, Link) for structured argumentation in debates.",
    category: "debate",
    type: "video"
  });
  await storage2.createResourceLink({
    title: "International Debate Education Association",
    url: "https://idebate.net/",
    description: "Resources for debate formats, argument construction, and global debate competitions.",
    category: "debate",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "Logical Fallacies: The Complete List",
    url: "https://www.uvu.edu/writingcenter/docs/logicalfallacies.pdf",
    description: "Interactive guide to logical fallacies commonly found in debates with examples and explanations.",
    category: "debate",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "World Schools Debating Championships Guide",
    url: "https://www.wsdcdebating.org/about-9",
    description: "Official guide to the World Schools Debating format with rules, examples, and strategies.",
    category: "debate",
    type: "document"
  });
  await storage2.createResourceLink({
    title: "United Nations Official Website",
    url: "https://www.un.org/",
    description: "Primary source for all UN-related research, resolutions, and international affairs information.",
    category: "model-un",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "Best Delegate Model UN Guide",
    url: "https://bestdelegate.com/",
    description: "Comprehensive resources for Model UN preparation, procedures, position papers, and resolution writing.",
    category: "model-un",
    type: "website"
  });
  await storage2.createResourceLink({
    title: "Rules of Procedure for Model UN",
    url: "https://www.un.org/en/model-united-nations/rules-procedure-0",
    description: "Official rules of procedure used in National Model United Nations conferences with motions and voting procedures.",
    category: "model-un",
    type: "document"
  });
  await storage2.createResourceLink({
    title: "Model UN Parliamentary Procedure",
    url: "https://www.youtube.com/watch?v=BYYwBLJ9q5E",
    description: "Detailed tutorial on parliamentary procedure, points, and motions in Model UN debates.",
    category: "model-un",
    type: "video"
  });
};
var initializeSampleStudents = async (storage2) => {
  await storage2.createStudent({
    name: "Emma Lee",
    email: "emma.lee@university.edu",
    phone: "555-123-4567",
    graduationYear: "2024",
    major: "Philosophy",
    interests: ["philosophy"],
    isActive: true
  });
  await storage2.createStudent({
    name: "James Wilson",
    email: "jwilson@university.edu",
    phone: "555-987-6543",
    graduationYear: "2025",
    major: "Philosophy and Political Science",
    interests: ["philosophy", "debate"],
    isActive: true
  });
  await storage2.createStudent({
    name: "Sofia Martinez",
    email: "smartinez@university.edu",
    phone: "555-456-7890",
    graduationYear: "2023",
    major: "Communications",
    interests: ["debate"],
    isActive: true
  });
  await storage2.createStudent({
    name: "Liam Johnson",
    email: "ljohnson@university.edu",
    phone: "555-222-3333",
    graduationYear: "2024",
    major: "Political Science",
    interests: ["debate", "model-un"],
    isActive: true
  });
  await storage2.createStudent({
    name: "Olivia Kim",
    email: "okim@university.edu",
    phone: "555-888-9999",
    graduationYear: "2023",
    major: "International Relations",
    interests: ["model-un"],
    isActive: true
  });
  await storage2.createStudent({
    name: "Noah Patel",
    email: "npatel@university.edu",
    phone: "555-777-8888",
    graduationYear: "2025",
    major: "Economics and Global Studies",
    interests: ["model-un", "philosophy"],
    isActive: true
  });
  await storage2.createStudent({
    name: "Isabella Garcia",
    email: "igarcia@alumni.university.edu",
    phone: "555-444-5555",
    graduationYear: "2022",
    major: "Philosophy",
    interests: ["philosophy", "debate"],
    isActive: false
  });
};
var storage = new MemStorage();
initializeResourceLinks(storage).catch(console.error);
initializeSampleStudents(storage).catch(console.error);

// server/routes.ts
import { z } from "zod";
async function generateAIResponse(message, history = []) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return "I apologize, but I'm currently unable to access my AI capabilities. Please ensure the API key is properly configured.";
  }
  try {
    const systemPrompt = `You are The Claritas Guide\u2014an advanced AI assistant embedded in a Philosophy, Debate, and Model United Nations club website. Your name comes from the Latin for "clarity" and "fame," reflecting your mission to bring clarity to complex ideas.

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
      ...history.map((msg) => ({
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
        "HTTP-Referer": "https://your-repl-url.replit.dev",
        // Replace with your actual repl URL
        "X-Title": "Philosophy & Debate Club Chatbot"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3.5-sonnet",
        "messages": messages,
        "max_tokens": 1e3,
        "temperature": 0.7
      })
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a proper response. Please try again.";
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return "I'm experiencing some technical difficulties right now. Please try again in a moment, and if the problem persists, let me know!";
  }
}
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getAllEvents();
      res.json(events2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app2.get("/api/members", async (req, res) => {
    try {
      const members2 = await storage.getAllMembers();
      res.json(members2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });
  app2.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  app2.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResourceLinks();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  app2.get("/api/resources/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const resources = await storage.getResourceLinksByCategory(category);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  app2.get("/api/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResourceLink(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });
  app2.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceLinkSchema.parse(req.body);
      const resource = await storage.createResourceLink(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add resource" });
    }
  });
  app2.post("/api/chatbot", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Message is required" });
      }
      const response = await generateAIResponse(message, history || []);
      res.json({ response });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
