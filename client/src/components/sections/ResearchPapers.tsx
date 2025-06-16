
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSearch, Calendar, User } from "lucide-react";
import { type BlogPost } from "@shared/schema";

const ResearchPapers = () => {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/blog-posts'],
  });

  // Filter for research papers
  const researchPapers = blogPosts.filter(post => 
    post.category === "research"
  );

  const [selectedPaper, setSelectedPaper] = useState<BlogPost | null>(null);

  const handlePaperClick = (paper: BlogPost) => {
    setSelectedPaper(paper);
  };

  return (
    <section id="research-papers" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            Research Papers
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            Explore in-depth research and academic investigations by our club members.
          </p>
          <div className="h-1 w-20 bg-secondary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper) => (
            <Card key={paper.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <FileSearch className="h-5 w-5 text-secondary" />
                  <span className="text-sm text-neutral-500 capitalize bg-secondary/10 px-2 py-1 rounded">
                    Research
                  </span>
                </div>
                <CardTitle className="text-lg font-heading font-semibold line-clamp-2">
                  {paper.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {paper.excerpt}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {paper.date}
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      onClick={() => handlePaperClick(paper)}
                    >
                      Read Paper
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading">
                        {selectedPaper?.title}
                      </DialogTitle>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedPaper?.date}
                        </div>
                        <div className="flex items-center">
                          <FileSearch className="h-4 w-4 mr-1" />
                          Research Paper
                        </div>
                      </div>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                      <div className="prose prose-lg max-w-none">
                        {selectedPaper?.imageUrl && (
                          <img 
                            src={selectedPaper.imageUrl} 
                            alt={selectedPaper.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                          />
                        )}
                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                          {selectedPaper?.content || selectedPaper?.excerpt}
                        </div>
                        {(!selectedPaper?.content || selectedPaper?.content === "" || selectedPaper?.content?.includes("Add your research paper content here")) && (
                          <div className="text-center py-8 text-neutral-500">
                            <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>This research paper content will be available soon.</p>
                            <p className="text-sm mt-2">Preview: {selectedPaper?.excerpt}</p>
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

        {researchPapers.length === 0 && (
          <div className="text-center py-12">
            <FileSearch className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">No Research Papers Available</h3>
            <p className="text-neutral-500">Research papers will be published here soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchPapers;
