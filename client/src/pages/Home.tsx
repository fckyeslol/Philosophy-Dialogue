import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Activities from "@/components/sections/Activities";
import Resources from "@/components/sections/Resources";
import Members from "@/components/sections/Members";
import MyEssays from "@/components/sections/MyEssays";
import Blog from "@/components/sections/Blog";
import Gallery from "@/components/sections/Gallery";
import Chatbot from "@/components/sections/Chatbot";
import Contact from "@/components/sections/Contact";
import { useQuery } from "@tanstack/react-query";
import { Event, Member, BlogPost, GalleryImage } from "@shared/schema";

const Home = () => {
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
      <Resources />
      <Members members={members} />
      <MyEssays />
      <Blog posts={blogPosts} />
      <Gallery images={galleryImages} />
      <Chatbot />
      <Contact />
    </>
  );
};

export default Home;