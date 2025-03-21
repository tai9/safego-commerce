
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  dressStyle: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Gradient Graphic T-shirt",
    category: "T-shirts",
    price: 145,
    originalPrice: 242,
    discount: 40,
    rating: 3.5,
    reviews: 123,
    colors: ["white", "black", "blue"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/lovable-uploads/cd011f2c-675c-4750-8cc2-421974b43274.png"],
    description: "This graphic t-shirt features a vibrant gradient design. Made from premium cotton for all-day comfort.",
    dressStyle: ["Casual"]
  },
  {
    id: "2",
    name: "Polo with Tipping Details",
    category: "T-shirts",
    price: 180,
    originalPrice: 242,
    discount: 25,
    rating: 4.5,
    reviews: 98,
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/lovable-uploads/6d530bed-3330-4e6e-bc5f-4ae73f4b2063.png"],
    description: "A classic polo shirt with contrasting tipping details on the collar and sleeves for a sophisticated look.",
    dressStyle: ["Casual", "Formal"]
  },
  {
    id: "3",
    name: "Black Striped T-shirt",
    category: "T-shirts",
    price: 120,
    originalPrice: 160,
    discount: 25,
    rating: 4.0,
    reviews: 86,
    colors: ["black", "white", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/lovable-uploads/1a91bd17-7194-498a-acf3-4dc18daa248e.png"],
    description: "A stylish striped t-shirt with a classic design. Perfect for casual everyday wear.",
    dressStyle: ["Casual"]
  },
  {
    id: "4",
    name: "Skinny Fit Jeans",
    category: "Jeans",
    price: 240,
    originalPrice: 260,
    discount: 7,
    rating: 3.5,
    reviews: 65,
    colors: ["blue", "black", "gray"],
    sizes: ["28", "30", "32", "34", "36"],
    images: ["/lovable-uploads/64341d02-b9c7-4e17-a103-2435e22dd3ef.png"],
    description: "Modern skinny fit jeans with a comfortable stretch. Sleek design for a contemporary look.",
    dressStyle: ["Casual", "Party"]
  },
  {
    id: "5",
    name: "Checkered Shirt",
    category: "Shirts",
    price: 180,
    rating: 4.5,
    reviews: 112,
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/lovable-uploads/50e38023-1ab4-4395-a99a-ef9d85a27d9d.png"],
    description: "A versatile checkered shirt that can be dressed up or down. Made from soft cotton fabric.",
    dressStyle: ["Casual", "Formal"]
  },
  {
    id: "6",
    name: "Sleeve Striped T-shirt",
    category: "T-shirts",
    price: 130,
    originalPrice: 160,
    discount: 18,
    rating: 4.5,
    reviews: 78,
    colors: ["orange", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/lovable-uploads/4cbbba7d-483f-4592-8429-560b25ec214f.png"],
    description: "A stylish t-shirt with contrasting striped sleeves for a sporty, casual look.",
    dressStyle: ["Casual", "Gym"]
  },
  {
    id: "7",
    name: "Vertical Striped Shirt",
    category: "Shirts",
    price: 212,
    originalPrice: 232,
    discount: 8,
    rating: 5.0,
    reviews: 43,
    colors: ["green", "blue", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/lovable-uploads/89e9b281-82ec-42ce-b4ae-47c6c08e9020.png"],
    description: "An elegant vertical striped shirt. Perfect for both casual and formal occasions.",
    dressStyle: ["Casual", "Formal"]
  },
  {
    id: "8",
    name: "Courage Graphic T-shirt",
    category: "T-shirts",
    price: 145,
    rating: 4.0,
    reviews: 56,
    colors: ["orange", "white", "black"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/lovable-uploads/afe12d1f-a5cc-44be-92ef-ccc0151fbf02.png"],
    description: "Express yourself with this bold graphic t-shirt featuring an inspiring 'Courage' design.",
    dressStyle: ["Casual", "Party"]
  },
  {
    id: "9",
    name: "Loose Fit Bermuda Shorts",
    category: "Shorts",
    price: 80,
    rating: 3.0,
    reviews: 32,
    colors: ["blue", "khaki", "black"],
    sizes: ["28", "30", "32", "34", "36"],
    images: ["/lovable-uploads/1aeccf89-6964-414c-842b-74ca991739fc.png"],
    description: "Comfortable loose fit bermuda shorts, perfect for casual summer days.",
    dressStyle: ["Casual", "Gym"]
  },
  {
    id: "10",
    name: "One Life Graphic T-shirt",
    category: "T-shirts",
    price: 260,
    originalPrice: 300,
    discount: 13,
    rating: 4.5,
    reviews: 65,
    colors: ["brown", "green", "blue"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/lovable-uploads/50e38023-1ab4-4395-a99a-ef9d85a27d9d.png"],
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    dressStyle: ["Casual", "Party"]
  }
];

export const reviewsData = [
  {
    id: "1",
    name: "Samantha D.",
    rating: 5,
    date: "August 14, 2023",
    verified: true,
    comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
  },
  {
    id: "2",
    name: "Alex M.",
    rating: 4,
    date: "August 15, 2023",
    verified: true,
    comment: "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
  },
  {
    id: "3",
    name: "Ethan R.",
    rating: 3,
    date: "August 16, 2023",
    verified: false,
    comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist, yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
  },
  {
    id: "4",
    name: "Olivia P.",
    rating: 4,
    date: "August 17, 2023",
    verified: true,
    comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."
  },
  {
    id: "5",
    name: "Liam K.",
    rating: 4,
    date: "August 18, 2023",
    verified: true,
    comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion!"
  },
  {
    id: "6",
    name: "Ava H.",
    rating: 5,
    date: "August 19, 2023",
    verified: true,
    comment: "I'm not just wearing a t-shirt, I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design makes this shirt a conversation starter!"
  }
];
