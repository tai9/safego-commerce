
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample brand data
const brandsData = [
  { id: "1", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", products: 42 },
  { id: "2", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", products: 56 },
  { id: "3", name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg", products: 28 },
  { id: "4", name: "Reebok", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Reebok_logo.svg", products: 21 },
  { id: "5", name: "Under Armour", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Under_armour_logo.svg", products: 18 },
  { id: "6", name: "New Balance", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg", products: 23 },
  { id: "7", name: "Converse", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg", products: 15 },
  { id: "8", name: "Fila", logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Fila_logo.svg", products: 17 },
  { id: "9", name: "Asics", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg", products: 14 },
  { id: "10", name: "Columbia", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Columbia_Logo.svg", products: 11 },
  { id: "11", name: "Levi's", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Levi%27s_logo.svg", products: 32 },
  { id: "12", name: "Calvin Klein", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Calvin_Klein_logo.svg", products: 25 },
  { id: "13", name: "Tommy Hilfiger", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Tommy_Hilfiger_logo.svg", products: 29 },
  { id: "14", name: "Ralph Lauren", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ralph_Lauren_Polo.svg", products: 31 },
  { id: "15", name: "Gucci", logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/1000px-Gucci_Logo.svg.png", products: 22 },
  { id: "16", name: "Versace", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Versace_logo.svg", products: 19 },
  { id: "17", name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg", products: 47 },
  { id: "18", name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", products: 54 },
];

const Brands = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBrands = brandsData.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Group brands alphabetically
  const groupedBrands = filteredBrands.reduce((groups, brand) => {
    const firstLetter = brand.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(brand);
    return groups;
  }, {});
  
  const alphabeticalGroups = Object.keys(groupedBrands).sort();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Shop by Brands | Safego Fashion</title>
        <meta name="description" content="Browse all fashion brands available at Safego." />
      </Helmet>
      
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">Brands</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Brands</h1>
          
          <div className="mb-8 max-w-md">
            <Input
              type="search"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          {filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No brands found</h3>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-10">
              {alphabeticalGroups.map(letter => (
                <div key={letter} id={`group-${letter}`} className="scroll-mt-20">
                  <h2 className="text-2xl font-bold mb-4 border-b pb-2">{letter}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groupedBrands[letter].map(brand => (
                      <Link 
                        key={brand.id} 
                        to={`/products?brand=${brand.name}`}
                        className="flex flex-col items-center p-6 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="w-24 h-24 flex items-center justify-center mb-4">
                          <img 
                            src={brand.logo} 
                            alt={brand.name} 
                            className="max-w-full max-h-full object-contain" 
                          />
                        </div>
                        <h3 className="font-medium text-lg">{brand.name}</h3>
                        <p className="text-sm text-muted-foreground">{brand.products} products</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Alphabetical index for quick navigation */}
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-1">
            {alphabeticalGroups.map(letter => (
              <a 
                key={letter}
                href={`#group-${letter}`}
                className="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </main>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
      )}
      
      <Footer />
    </div>
  );
};

export default Brands;
