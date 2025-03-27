
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  url: string;
}

// Placeholder images - replace with actual game screenshots
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    title: "Epic Castle Siege",
    description: "Our clan's forces attacking the enemy fortress during the weekend war event.",
    url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Dragon Raid",
    description: "Taking down the legendary dragon boss with our elite squad.",
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Victory Celebration",
    description: "Celebrating our tournament victory with the whole clan.",
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Alliance Meeting",
    description: "Strategic planning session with our allied clans.",
    url: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Resource Expedition",
    description: "Gathering rare resources in the ancient forest.",
    url: "https://images.unsplash.com/photo-1565284663639-1a2fb069c89c?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Legendary Equipment",
    description: "Our clan leader showing off newly acquired legendary gear.",
    url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1400&auto=format&fit=crop"
  }
];

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!currentImage) return;
    
    const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === currentImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    } else {
      newIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    }
    
    setCurrentImage(GALLERY_IMAGES[newIndex]);
  };
  
  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setVisibleItems(prev => [...prev, id]);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImage]);

  return (
    <section id="gallery" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Battle Gallery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image) => (
            <div 
              key={image.id}
              data-id={image.id}
              className={cn(
                "gallery-item glass-card overflow-hidden card-hover cursor-pointer",
                "transition-all duration-500",
                visibleItems.includes(image.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              onClick={() => openLightbox(image)}
            >
              <div className="relative aspect-video overflow-hidden">
                {!imagesLoaded[image.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-clan-dark-accent">
                    <Image className="text-clan-gold animate-pulse" size={24} />
                  </div>
                )}
                <img 
                  src={image.url} 
                  alt={image.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500 hover:scale-110",
                    !imagesLoaded[image.id] && "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                <p className="text-white/70 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-clan-dark-accent/70 backdrop-blur-sm p-2 rounded-full text-white/70 hover:text-white hover:bg-clan-dark-accent/90 transition-all z-10"
            onClick={() => navigateLightbox('prev')}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-clan-dark-accent/70 backdrop-blur-sm p-2 rounded-full text-white/70 hover:text-white hover:bg-clan-dark-accent/90 transition-all z-10"
            onClick={() => navigateLightbox('next')}
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="max-w-5xl w-full">
            <div className="relative">
              <img 
                src={currentImage.url} 
                alt={currentImage.title}
                className="w-full h-auto max-h-[80vh] object-contain animate-scale-in"
              />
            </div>
            
            <div className="mt-4 bg-clan-dark-accent/70 backdrop-blur-sm p-4 rounded-lg animate-fade-in">
              <h3 className="text-white font-semibold text-lg">{currentImage.title}</h3>
              <p className="text-white/70">{currentImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
