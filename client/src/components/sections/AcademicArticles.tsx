
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Calendar, User } from "lucide-react";
import { type BlogPost } from "@shared/schema";

const AcademicArticles = () => {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/blog-posts'],
  });

  // Filter for academic articles
  const academicArticles = blogPosts.filter(post => 
    post.category === "academic"
  );

  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const handleArticleClick = (article: BlogPost) => {
    setSelectedArticle(article);
  };

  return (
    <section id="academic-articles" className="py-16 bg-gradient-to-r from-accent/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            Academic Articles
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            Scholarly articles and academic publications from our club community.
          </p>
          <div className="h-1 w-20 bg-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicArticles.map((article) => (
            <Card key={article.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span className="text-sm text-neutral-500 capitalize bg-accent/10 px-2 py-1 rounded">
                    Academic
                  </span>
                </div>
                <CardTitle className="text-lg font-heading font-semibold line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      onClick={() => handleArticleClick(article)}
                    >
                      Read Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading">
                        {selectedArticle?.title}
                      </DialogTitle>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedArticle?.date}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Academic Article
                        </div>
                      </div>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                      <div className="prose prose-lg max-w-none">
                        {selectedArticle?.imageUrl && (
                          <img 
                            src={selectedArticle.imageUrl} 
                            alt={selectedArticle.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                          />
                        )}
                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                          {selectedArticle?.content || selectedArticle?.excerpt}
                        </div>
                        {(!selectedArticle?.content || selectedArticle?.content === "" || selectedArticle?.content?.includes("Add your academic article content here")) && (
                          <div className="text-center py-8 text-neutral-500">
                            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>This academic article content will be available soon.</p>
                            <p className="text-sm mt-2">Preview: {selectedArticle?.excerpt}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {academicArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">No Academic Articles Available</h3>
            <p className="text-neutral-500">Academic articles will be published here soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademicArticles;
