import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type GalleryImage } from "@shared/schema";

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">Photo Gallery</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">Moments captured from our events, competitions, and gatherings.</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length > 0 ? (
            images.slice(0, 6).map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-heading font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-neutral-500">No gallery images available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/gallery">
            <Button variant="link" className="text-primary hover:text-primary-dark">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
