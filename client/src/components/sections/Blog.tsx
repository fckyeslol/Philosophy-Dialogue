import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@shared/schema";

interface BlogProps {
  posts: BlogPost[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <section id="blog" className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">From Our Blog</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">Explore articles, debates, and reflections written by our members.</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge className={`
                      ${post.category === 'philosophy' 
                        ? 'bg-primary-light/10 text-primary-light' 
                        : post.category === 'debate' 
                          ? 'bg-secondary-light/10 text-secondary-light' 
                          : 'bg-accent-light/10 text-accent-light'
                      } text-xs font-semibold px-2 py-1 rounded`}
                    >
                      {post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : 'General'}
                    </Badge>
                    <span className="text-neutral-500 text-sm ml-auto">{post.date}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                {post.excerpt || (post.content ? post.content.charAt(0).toUpperCase() + post.content.slice(1, 150) + '...' : 'No content available')}
              </p>
                  <div className="flex items-center mt-4">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80" 
                      alt="Author" 
                      className="h-10 w-10 rounded-full mr-3" 
                    />
                    <span className="text-sm font-medium">Mateo Pirela</span>
                    <a href="#" className="ml-auto text-primary hover:text-primary-dark font-medium">Read More</a>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-neutral-500">No blog posts available at the moment.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button variant="link" className="text-primary hover:text-primary-dark">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;