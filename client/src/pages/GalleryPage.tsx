
import { useQuery } from "@tanstack/react-query";
import { GalleryImage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const GalleryPage = () => {
  const { data: galleryImages = [] } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery-images'],
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 p-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Explore our collection of memories from events, competitions, and gatherings.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="w-full h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-heading font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">No gallery images available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
