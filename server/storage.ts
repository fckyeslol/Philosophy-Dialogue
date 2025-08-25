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
    // Sample members
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

    // Sample blog posts
    this.createBlogPost({
      title: "Revolución Industrial y Antropoceno: Los Efectos de los Avances Tecnológicos.",
      content: `Revolución Industrial y Antropoceno: Los Efectos de los Avances Tecnológicos.
En la actualidad, las problemáticas ambientales se encuentran intrínsecamente relacionadas con los avances tecnológicos que datan en la revolución industrial, desde 1780 hasta 1850, los cuales han determinado una crisis que permea en la preocupación de los gobiernos y los activistas ambientales, cuyos planteamientos derivan discusiones de suma relevancia tanto en el marco político, como en las perspectivas sociales que promueven la concientización de las acciones humanas frente a este fenómeno. En el presente texto, se establece la problemática central del antropoceno para exponer dos argumentos que se sustentan desde fuentes académicas.
El concepto clave denominado Antropoceno constituye una época geológica caracterizada por la dominancia del impacto humano sobre el planeta, que según Cuomo. (2017) se refiere “al hecho de que los seres humanos (anthropos) influyen, como nunca antes en la historia, en los diferentes sistemas existentes en la Tierra, así como en otras especies. Esto produce cambios impredecibles y perdurables” (p.4). La relación de Cuomo con la revolución industrial del siglo XVIII hace pensar que, la utilización de maquinarias para la realización de los trabajos crea una demanda insaciable de recursos energéticos, que para esta época solo se podía realizar con la extracción de energía fósil, la que proviene de la quema de combustibles como el carbón y el petróleo, este procedimiento genera los llamados gases de efecto invernadero, como lo son el dióxido de carbono y el metano que actúan como una manta que recubre la tierra, y retiene el calor solar, el cual produce el aumento de las temperaturas. 
Desde la perspectiva personal, plantear la problemática permite en primera instancia, citar a Santayana. (1905). "Los que no pueden recordar el pasado están condenados a repetirlo"(p.44). Lo cual significa, que como pensaba Michel Foucault, Karl Marx, diversos sociólogos y economistas, el entendimiento de la historia, y los hechos que la marcaron es fundamental para la comprensión de las problemáticas contemporáneas y el enfrentamiento de estas mismas. Por lo tanto, ubicarse desde el análisis histórico en el desarrollo de la problemática ambiental actual, en comparación con los avances industriales y tecnológicos determina que los efectos de la revolución industrial influyen negativamente en la producción de gases de efecto invernadero, debido, a la aparición de las maquinarias industriales y el interés empresarial por el uso desmedido de recursos naturales.
En primer lugar, la aparición de las maquinarias industriales que nacen debido a la abismal demanda de energía presentada como consecuencia de la revolución industrial y el nuevo sistema económico inciden negativamente, así como lo señala Serratos (2021) Plantea que necesitamos cambiar el sistema económico, que nos vende la idea de que es necesario destruir la naturaleza para obtener un bienestar.  Al respecto conviene decir que según la Organización de las Naciones Unidas (ONU), en el informe del Intergovernmental Panel on Climate Change (IPCC, 2021) el ser humano es responsable del calentamiento global de los últimos 200 años, donde se puede ver que la temperatura media de la tierra es 1,1ºC más elevada que a finales del siglo XIX. Ahora bien, paralelamente al incremento masivo de la producción de gases de efecto invernadero, se ha registrado, un hecho histórico que marcó un punto de inflexión en la producción de estos nocivos gases, que es la hegemonización mundial del sistema capitalista.
 A pesar de que se están creando nuevos mecanismos para la sustentación de las necesidades energéticas, como son las energías limpias y renovables, se está pasando por alto la raíz de la problemática, en la que encontramos como consecuencia, no solo la demanda excesiva de energía, sino en general de los recursos naturales, que se explotan de manera salvaje en aquellos países que cuentan con estos. 
Según los datos publicados en la revista científica The Lancet, del informe internacional presentado por La Universidad Autónoma de Barcelona, desde 1970 hasta 2017 Estados Unidos representa el 27% de uso excesivo de materiales en el mundo, seguido de este la UE con un 25% (incluyendo a Reino Unido). Para que se pueda comprender lo preocupante de estas cifras, hay que tener en cuenta que se han extraído en total 2.500 millones de toneladas de recursos naturales en todo el planeta, ahora bien más de la mitad del uso de estos recursos recae, en los estados mencionados con anterioridad. Y, que al sumar los indicadores de todos los países del sur global, o  sea América Latina, Caribe, África, Medio Oriente y gran parte de Asia, únicamente representan el 8% de uso excesivo de estos materiales.
Al respecto se señala que la razón principal por la que existe este desfase entre Estados Unidos y un gran número de países, en la utilización de recursos naturales, a priori, es debido al modelo capitalista donde la propiedad privada y el supuesto libre mercado son el eje de la economía, en el cual es necesaria la extracción masiva de los recursos para poder cumplir con el ideal planteado en este sistema, que es el crecimiento exponencial e infinito de la economía, pero que no prevalece el medio ambiente en la ecuación de crecimiento exponencial económico, ya que, aunque exista la posibilidad de crecer la economía de manera infinita, los recursos naturales con los que contamos son limitados.
        Retomando la tesis planteada en este escrito con los argumentos desarrollados, este ensayo no pretende agotar la discusión ni mucho menos suministrar una respuesta absoluta, pero al tiempo nos posiciona ante la necesidad imperativa de mantener abierta la reflexión filosófica desde la permanente interrogación para identificar la relación entre la crisis ambiental, la aparición de las maquinarias industriales y el interés empresarial por el uso desmedido de recursos naturales, con el objetivo de proponer un camino que lleve a la solución de la situación problema con el propósito de reestructurar el sistema político y socioeconómico, dando como manifiesto la necesidad de mantener la reflexión filosófica alrededor de la pregunta como la luz que ilumine el sendero a transitar en el Antropoceno.
        Para finalizar se plantean unas interrogantes que permitirán la reflexión con respecto a la problemática tratada en este ensayo:
¿Por qué se debe promover la concientización ambiental?
¿Cuáles son las medidas inmediatas que se deben de tomar por parte del ciudadano promedio para enfrentar la crisis climática?
¿Cómo se puede contribuir desde el seno del hogar y familiar a la concientización de la problemática ambiental?

Referencias

Cuomo, C. (2017). Against the Idea of an Anthropocene Epoch: Ethical, Political and Scientific Concerns. Biogeosystem Technique, 4(1), 4–8.   https://doi.org/10.13187/bgt.2017.1.4     
Serratos, F. (2020). El capitaloceno.  Universidad Nacional Autónoma de México
United Nations [UN]. (s/f). ¿Qué es el cambio climático? | Naciones Unidas., de https://www.un.org/es/climatechange/what-is-climate-change
Hickel, J., O'Neill, D. W., Fanning, A. L., & Zoomkawala, H. (2022). National responsibility for ecological breakdown: a fair-shares assessment of resource use, 1970–2017. The Lancet. Planetary Health, 6(4), e342–e349. https://doi.org/10.1016/S2542-5196(22)00044-4`,
      excerpt: "Explorando los conceptos clave que caracterizan el antropoceno.",
      category: "filosofia",
      date: "10 abril, 2024",
      imageUrl: "/images/antropoceno.webp",
      authorId: 1
    });

    this.createBlogPost({
      title: "La pesadilla moderna",
      content: `La pesadilla moderna

Hace mucho tiempo, alrededor del 300 a.c, se encontraba Diógenes de Sinope en Atenas reposando debajo de la sombra  de un árbol de olivo. Tras unos minutos ahí, cierra sus ojos y cae en un sueño profundo. Después de cierto tiempo, Diógenes despierta, pero al levantarse queda anonadado. Se encontraba en un lugar distinto al que había quedado dormido. Al mirar a su alrededor se da cuenta que no solo no estaba debajo del árbol de olivo, se encontraba en un ambiente que nunca había visto. Todo era muy distinto a todo lo que había presenciado a lo largo de su vida. Diógenes se encontraba en un ambiente turbio y oscuro, sobre cargado de edificaciones, y lleno de unos objetos metálicos de gran magnitud que dentro llevaban personas las cuales él desconocía. Igualmente, al dar una vuelta notaba que había una gran multitud de personas, todas llevaban unas vestiduras extrañas, llevando la ropa superior separada a la inferior, portando en los pies unas extrañas coberturas de tela amarradas por un cordón. La gente en la calle caminaba como muy de prisa, no se detenían a reflexionar y platicar el uno con el otro, algunos incluso portaban unos objetos en las orejas que los aislaban de su alrededor. Pero lo que más le desconcertaba era que a pesar de haber recorrido el lugar por un rato, la cantidad de árboles que había visto era mucho menor a lo que él estaba acostumbrado a ver en Atenas. 

Diógenes se sentía perdido, pero al mismo tiempo no podía guardar su curiosidad. 
¿En dónde se encontraba? ¿Qué estaba sucediendo y por qué todo era tan distinto? 
Al cabo de un rato de estar navegando a la deriva por las calles que no parecían ser Grecia, la sed lo invadió, por lo que decidió entrar a un salón del que había observado a varias personas entrar y salir con bebidas. Cada vez era más impresionante lo que observaba. Esta vez, el espacio se le hacía más reconocido. De hecho, ya veía personas charlar unas con las otras, sin embargo, algunas sostenían en sus manos un extraño objeto pequeño y resplandeciente, que parecían hacerlos reír.
Absorto en sus pensamientos, alguien lo tropieza y riega sobre su única prenda, una bebida, lo que causa que ahora tenga una gran mancha marrón sobre sí. Sin prestar mucha atención sobre lo recién ocurrido y sin decir una sola palabra, sale del lugar. Empieza a adaptarse a todo y a dejar de darle mucha importancia. Después de salir, nota a lo lejos lo que parece ser un hombre recostado sobre el piso, utilizando pocas prendas y sin muchas pertenencias a su alrededor. Del rostro de Diógenes brota lo que parece ser un rastro de alegría, pues piensa en que por fin ha encontrado un verdadero hombre, desapegado a cualquier tipo de cosa material. Sorprendido, se acerca para sentarse al lado de uno de sus iguales. El hombre, aunque extrañado, observa el aspecto de Diógenes y le comenta: - La situación cada vez es más difícil, ¿cierto? Aparte, con estas calores, ya no solo es difícil sustentarse y sobrevivir, pero encontrarle un lado agradable a la vida.- Diógenes, ahora confundido por las palabras del que pocas prendas lleva, le dice -¿A qué situación se refiere con tanto aborrecimiento de la vida?- Posterior a su pregunta y notando todo el desconcierto de Diógenes, el hombre, sin cuestionar todo su desconocimiento ante el mundo actual, le explica sobre los problemas que enfrenta y produce la humanidad, entre ellos, cómo este está en vía de destruir su propio hogar, el planeta tierra. Le habla de cómo, a pesar de no siempre haberse encontrado en la situación en la que está, hubieron varios acontecimientos que llevaron a que ya no poseyera lugar donde vivir ni cosas qué tener.

Para este punto, era claro para Diógenes reconocer que se encontraba en un tiempo distinto al que pertenece. No tenía claro qué había hecho posible el que se encontrara en otro momento de la humanidad, pero era evidente lo poco que había cambiado la insistencia de las personas por crear y poseer cada vez más. Le era difícil entender y procesar todo lo que ocurría, más aún, tomó la decisión de enterarse de más, puesto que, de todo lo que había escuchado del que le había contado ser un 'indigente', le preocupó más el hecho que mencionara que las personas poco a poco y con todas sus invenciones, se encontraran destruyendo el lugar que habitamos todas las personas, que ahora se conoce como 'planeta tierra'. Diógenes se había propuesto entender todo lo que pasaba en ese momento, lo que, a pesar de no ser una acción que tomaría el filósofo en su cotidianidad, entendía que era necesario para poder seguir existiendo. 

Habían pasado unos días desde que el filósofo cínico había llegado por primera vez al mundo actual. A pesar de tener que adaptarse a este, su pensamiento sobre la vida no había cambiado tanto con relación a cómo vivía antes de conocer el nuevo mundo. Conservaba parte del estilo de vida que llevaba antes, pues había aprendido que no solo se prohíben ciertos comportamientos al margen público, sino que también habrían reprendas en contra de él si no cumplía con el 'actuar debido'. Pensaba en aquella Grecia que tanto criticaba y que sin embargo no se comparaba con todo lo que pensaba de la actual. Cada vez aumentaba su incomprensión del actuar del ser humano, que, por lo que había estado leyendo en las bibliotecas que milagrosamente le permitían la entrada, actúa en detrimento de sí mismo y el ambiente en el que se encuentra. Así, las guerras que estaban por venir sobre su tiempo no solo acabarían con la vida de las personas, pero también afectaría la vida de la naturaleza y todos los animales que se encuentran en ella, que por razones atribuídas a explicaciones complicadas sobre cómo una genera a la otra, todo concluía en que las personas crean e inventan lo suficiente como para tener el poder de acabar con el único lugar que tienen para vivir. ¿Qué era eso de las máquinas?  ¿Por qué le era tan necesario al ser humano, actuar para obtener más, sin ser esto lo que les daría felicidad? Nunca comprendieron que la felicidad se encontraba en el desapego y en lugar de eso, se alejaban de su naturaleza y al final, su apego por las cosas superfluas, aquello que se suponía les iba a traer alegría sobre ellos mismos, causará su propia destrucción. 

Todas estas cuestiones lo inquietaban y mientras más conocía sobre el actuar del ser humano, menos dudaba en exclamar y pregonar todos sus pensamientos en público. Las plazas, los parques, las calles, se convertían cada día en escenario de todas sus quejas. La gente se aglomeraba o lo ignoraban. Aun así, de momento, nadie reconocía el por qué de su gran similitud con el filósofo griego Diógenes de Sinope. Aunque, algunos tantos habrán divagado en que se basaba y elegía vivir como lo hacía el antiguo cínico. 

Diógenes había dejado de notar la extrañeza de vivir en el tiempo de la actual Atenas, hasta que un día despertó sin volver a reconocer el lugar en el que estaba. Esta vez, el levantarse le provocó lágrimas y gran estruendo afligía su corazón. Pues, observaba cautelosamente el nuevo lugar que le rodeaba y no era visible ni un solo árbol a su alrededor. El calor era aún más contundente que la anterior vez que había despertado sin entender el espacio en el que se encontraba y ya tenía presente la razón del por qué. Creía intuir qué pasaba y no podía creer la nueva realidad. Su desconcierto fue tal que al siquiera acercarse a las masas y enterarse que tenía la razón, no tuvo remedio que elegir dormir esperando a despertar de la pesadilla aún más contundente. Así que regresa a su nuevo punto de partida y vuelve a cerrar sus ojos. Fue ahí cuando comprendió que el ser humano no pudo recuperar su hogar porque nunca cesó ni dejó de lado sus ansias de poseer más. 

Diógenes se despierta de su última siesta. Todavía sin abrir sus ojos, escucha el canto de los pájaros y el olor de la grama que sus manos tocan. Lentamente abre sus ojos, y siente una hoja caer sobre su cara, por encima de él se encuentra el árbol de olivo. Ve sus prendas y encuentra una vieja mancha marrón impregnada sobre la tela. Ya sabe la importancia del remedio del ser humano. 

Teniendo en cuenta la idea de Antropoceno, ¿Pensar sobre el futuro se constituye en una utopía o en una distopía?`,
      excerpt: "Una reflexión filosófica a través de los ojos de Diógenes de Sinope.",
      category: "filosofia",
      date: "10 abril, 2024",
      imageUrl: "/images/diogenes.gif",
      authorId: 1
    });

    this.createBlogPost({
      title: "¿Izquierda o Derecha?: Filosofía de la lucha de poderes",
      content: `¿Izquierda o Derecha?: Filosofía de la lucha de poderes
Desde tiempos que hoy parecen lejanos, se hablaba de división de poderes, de lucha
incesante por dominar, por vencer; actualmente seguimos viendo como la polarización nubla
perspectivas. Los orígenes de estos términos ideológicos, derecha e izquierda, datan
específicamente en 1789, Europa, la revolución francesa y la convocatoria de la Asamblea de los
Estados Generales, donde claramente los miembros de esta al querer demostrar su posición no solo
ideológica sino también a favor o no del rey, se asignaron puestos. A la derecha se sentaban los
que estaban de acuerdo con el monarca Luis XVI de Francia y sus ideales, entre tanto que los
revolucionarios lo hacían a la izquierda.
Mientras que en Europa ser de derecha habla de “conservadurismo” y ser de izquierda
implica ser “socialista”, en Estados Unidos los de izquierda son “demócratas”, así que es clave
destacar que no en todas las partes del mundo ser de izquierda o de derecha tiene la misma
connotación, pero lo que sí es igual para todas las culturas, idiomas o sistemas políticos es el
significado de la máxima “Divide y vencerás”; frase del común a la cual no se le atribuye autor
pero si bien tiene razón, en la obra, El arte de la guerra, se supo ampliar de la mejor manera, ya
que Sun Tzu (2023) señala que “el control de una fuerza grande es el mismo principio que el
control de unos pocos hombres: se trata simplemente de dividir sus números”. Ahora el
interrogante es ¿El que nosotros como pueblo elijamos un bando u otro no es solo una estrategia
de las elites para dividirnos y así tener control de las masas?
Según Kofman (2006), cuando se nos obliga a pensar en términos estrictamente opuestos,
como extremos irreconciliables, perdemos la oportunidad de encontrar soluciones más complejas
y efectivas, ya que esta forma de pensar limita el análisis y fomenta respuestas simplistas; lo que
puede explicar el por qué las personas actualmente se dejan llevar por la polarización y no son

críticas con respecto a personajes políticos sólo porque estos son de la bancada que los representa,
sin detenerse a pensar si realmente estas personas los representan.
Estamos como sociedad distópica y abrumada siempre buscando donde pertenecer y nos
entregamos a un extremo o al otro, creyendo que esto será la solución al problema sin entender
que caemos en la trampa del “divide y vencerás”: porque al estar en discordia, el pueblo nunca
gana. Dejamos que, los poderosos, los que rigen, controlen, porque nosotros estamos ocupados
poniendo etiquetas y dividiéndonos como sociedad cada vez más, lo que hace que las voces pierdan
fuerza. Somos culpables de una fragmentación social que, dentro de poco, ya no tendrá reversa.
Claro ejemplo de que la polarización política y la escogencia de “bandos” distorsiona
nuestra visión política e incluso nuestra humanidad es el caso del atentado del Congresista y
precandidato presidencial Miguel Uribe Turbay el pasado 7 de junio del presente año. Mientras
que él se debatía entre la vida y la muerte, estaban muchos colombianos creando teorías y
afirmando rumores por plataformas como X o Facebook; personas de izquierda incluso afirmaban
que era un autoatentado y personas de derecha alegando que era un intento de asesinato que venía
de parte de la izquierda y su gobierno, todos sin pruebas.
¿Realmente el culpar a una ideología u otra podía subsanar lo ocurrido? Rotundamente no,
pero mientras que nosotros estábamos indolentes eligiendo posiciones a la derecha o a la izquierda
del rey como en 1789, en Colombia, 2025, seguía habiendo desigualdad social, los índices de
pobreza aumentaban, la violencia e inseguridad local seguía haciéndose notar y el candidato seguía
en cama.
Es tiempo de entender que el dividirnos no traerá ningún tipo de éxito, que, si queremos
salvar nuestra nación, la unión hace la fuerza. Impedir que se pierda el poder que tenemos como
pueblo, fuerte y extenso, es nuestro deber como ciudadanos pensantes. Construir un futuro utópico

en el que la fragmentación social no sea una realidad, oponerse a que sea utilizada como estrategia
por el poder dominante para evitar la formación de mayorías hegemónicas que mantienen la
sociedad dividida. Es tiempo de ser un solo pueblo, y mirar hacia el frente, a nuestro presente y
nuestro futuro: no a la derecha, ni a la izquierda.

Referencias

LW. (2024, noviembre 3). �Son de izquierda y derecha? Que son los demócratas y
republicanos en USA. Marca.
https://www.marca.com/mx/actualidad/2024/11/03/6727ee87e2704e36518b4583.html

Sadurní, J. M. (2012, noviembre 16). La Revolución Francesa: el fin del Antiguo Régimen.
National geographic.
https://historia.nationalgeographic.com.es/a/revolucion-francesa-fin-antiguo-regimen-2_6774

Sun Tzu. (2023). El arte de la guerra (A. Galvany, Trad.). Editorial Trotta. (Trabajo original
del siglo IV a.C.)

Kofman, F. (2006). Conscious business: How to build value through values. Harvard
Business Review Press.`,
      excerpt: "Reflexion acerca de la polarizacion politica contemporanea.",
      category: "filosofia",
      date: "12 abril, 2025",
      imageUrl: "/images/politics.jpg",
      authorId: 1
    });
  

    // Sample gallery images
    this.createGalleryImage({
      title: "Marcemun",
      date: "2025",
      imageUrl: "/images/marcemun.png"
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