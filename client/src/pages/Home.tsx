import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Activities from "@/components/sections/Activities";
import Events from "@/components/sections/Events";
import Resources from "@/components/sections/Resources";
import Members from "@/components/sections/Members";
import Blog from "@/components/sections/Blog";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import { useQuery } from "@tanstack/react-query";
import { Event, Member, BlogPost, GalleryImage } from "@shared/schema";

const Home = () => {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const { data: members = [] } = useQuery<Member[]>({
    queryKey: ['/api/members'],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const { data: galleryImages = [] } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery-images'],
  });

  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Events events={events} />
      <Resources />
      <Members members={members} />
      <Blog posts={blogPosts} />
      <Gallery images={galleryImages} />
      <Contact />
    </>
  );
};

export default Home;
