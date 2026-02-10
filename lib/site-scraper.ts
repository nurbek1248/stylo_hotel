// Site Scraper Utility - Sayt ma'lumotlarini o'qish uchun
export interface ScrapedSiteData {
  rooms: RoomInfo[];
  amenities: string[];
  services: ServiceInfo[];
  testimonials: Testimonial[];
  gallery: string[];
  contactInfo: ContactInfo;
  aboutInfo: string;
}

export interface RoomInfo {
  name: string;
  price: number;
  currency: string;
  features: string[];
  description: string;
  imageUrl?: string;
}

export interface ServiceInfo {
  name: string;
  description: string;
  hours?: string;
  price?: string;
}

export interface Testimonial {
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  socialLinks: Record<string, string>;
}

// Saytdan ma'lumotlarni olish funksiyasi
export const scrapeSiteData = (): ScrapedSiteData => {
  try {
    // Rooms ma'lumotlarini olish
    const rooms = scrapeRooms();
    
    // Amenities ma'lumotlarini olish
    const amenities = scrapeAmenities();
    
    // Services ma'lumotlarini olish
    const services = scrapeServices();
    
    // Testimonials ma'lumotlarini olish
    const testimonials = scrapeTestimonials();
    
    // Gallery rasmlarini olish
    const gallery = scrapeGallery();
    
    // Contact ma'lumotlarini olish
    const contactInfo = scrapeContactInfo();
    
    // About ma'lumotlarini olish
    const aboutInfo = scrapeAboutInfo();
    
    return {
      rooms,
      amenities,
      services,
      testimonials,
      gallery,
      contactInfo,
      aboutInfo
    };
  } catch (error) {
    console.error('Site scraping error:', error);
    // Fallback ma'lumotlar
    return getDefaultSiteData();
  }
};

// Rooms ma'lumotlarini olish
const scrapeRooms = (): RoomInfo[] => {
  const rooms: RoomInfo[] = [];
  
  // DOM dan xonalarni qidirish
  const roomElements = document.querySelectorAll('[data-room-type]');
  
  if (roomElements.length > 0) {
    roomElements.forEach(element => {
      const name = element.getAttribute('data-room-name') || '';
      const price = parseFloat(element.getAttribute('data-room-price') || '0');
      const currency = element.getAttribute('data-currency') || 'USD';
      const features = element.getAttribute('data-features')?.split(',') || [];
      const description = element.querySelector('.room-description')?.textContent?.trim() || '';
      const imageUrl = element.querySelector('img')?.src || '';
      
      if (name && price > 0) {
        rooms.push({
          name,
          price,
          currency,
          features,
          description,
          imageUrl
        });
      }
    });
  } else {
    // Static fallback data
    rooms.push(
      {
        name: "Presidential Suite",
        price: 300,
        currency: "USD",
        features: ["2 xona", "jacuzzi", "shaxsiy butler", "panoramik ko'rinish"],
        description: "Eng yuqori darajadagi luks xona"
      },
      {
        name: "Executive Suite",
        price: 200,
        currency: "USD", 
        features: ["king-size yotoq", "workspace", "premium Wi-Fi"],
        description: "Biznes safarlari uchun ideal"
      },
      {
        name: "Deluxe Room",
        price: 150,
        currency: "USD",
        features: ["premium ko'rinish", "smart TV", "konditsioner"],
        description: "Komfort va stil uyg'unligi"
      }
    );
  }
  
  return rooms;
};

// Amenities ma'lumotlarini olish
const scrapeAmenities = (): string[] => {
  const amenities: string[] = [];
  
  const amenityElements = document.querySelectorAll('[data-amenity]');
  
  if (amenityElements.length > 0) {
    amenityElements.forEach(el => {
      const amenity = el.textContent?.trim();
      if (amenity) amenities.push(amenity);
    });
  } else {
    // Fallback amenities
    amenities.push(
      "24/7 xizmat",
      "Bepul Wi-Fi",
      "Mini bar",
      "Konditsioner",
      "Sejf",
      "Smart TV",
      "Premium choyxona jihozlari"
    );
  }
  
  return amenities;
};

// Services ma'lumotlarini olish
const scrapeServices = (): ServiceInfo[] => {
  const services: ServiceInfo[] = [];
  
  // SPA Service
  services.push({
    name: "Luxury Spa Center",
    description: "Professional massage va parhez xizmatlari",
    hours: "09:00-22:00",
    price: "Starting from $50"
  });
  
  // Fitness Service
  services.push({
    name: "Fitness Center",
    description: "Zamonaviy jihozlar bilan jihozlangan sport zal",
    hours: "06:00-23:00"
  });
  
  // Pool Service
  services.push({
    name: "Infinity Pool",
    description: "Panoramik ko'rinishli suzish havzasi",
    hours: "06:00-22:00"
  });
  
  return services;
};

// Testimonials ma'lumotlarini olish
const scrapeTestimonials = (): Testimonial[] => {
  const testimonials: Testimonial[] = [];
  
  testimonials.push(
    {
      author: "Anna Petrova",
      content: "Ajoyib xizmat va qulay xonalar. Tashakkur!",
      rating: 5,
      date: "2024-01-15"
    },
    {
      author: "John Smith",
      content: "Perfect location and excellent staff!",
      rating: 5,
      date: "2024-01-10"
    },
    {
      author: "Mehmet Yılmaz",
      content: "Har şey mükemmeldi, teşekkür ederiz!",
      rating: 5,
      date: "2024-01-05"
    }
  );
  
  return testimonials;
};

// Gallery rasmlarini olish
const scrapeGallery = (): string[] => {
  const images: string[] = [];
  
  const imageElements = document.querySelectorAll('.gallery-image, [data-gallery]');
  
  imageElements.forEach(el => {
    const img = el.querySelector('img');
    if (img?.src) {
      images.push(img.src);
    }
  });
  
  // Agar rasm topilmasa, placeholder ishlatish
  if (images.length === 0) {
    images.push('/placeholder.svg');
  }
  
  return images.slice(0, 10); // Max 10 rasm
};

// Contact ma'lumotlarini olish
const scrapeContactInfo = (): ContactInfo => {
  return {
    phone: "+998 90 123 45 67",
    email: "info@stylo-residence.uz",
    address: "Toshkent shahri, Chilonzor tumani, Navoiy ko'chasi 45-uy",
    socialLinks: {
      telegram: "@stylo_reception",
      instagram: "@stylo_residence",
      facebook: "/stylo.residence"
    }
  };
};

// About ma'lumotlarini olish
const scrapeAboutInfo = (): string => {
  const aboutElement = document.querySelector('.about-content, [data-about]');
  return aboutElement?.textContent?.trim() || 
    "Stylo Residence - Toshkent markazidagi 5 yulduzli mehmonxona. 2024 yildan beri mijozlarga yuqori sifatli xizmat ko'rsatib kelmoqdamiz.";
};

// Fallback ma'lumotlar
const getDefaultSiteData = (): ScrapedSiteData => {
  return {
    rooms: scrapeRooms(),
    amenities: scrapeAmenities(),
    services: scrapeServices(),
    testimonials: scrapeTestimonials(),
    gallery: ['/placeholder.svg'],
    contactInfo: scrapeContactInfo(),
    aboutInfo: scrapeAboutInfo()
  };
};

// AI Training uchun ma'lumotlarni tayyorlash
export const prepareTrainingData = (siteData: ScrapedSiteData) => {
  const trainingData = {
    rooms: siteData.rooms.map(room => ({
      prompt: [`${room.name} haqida`, `${room.name} xususiyatlari`, `${room.name} narxi`],
      response: `🏨 ${room.name}\n💰 Narxi: ${room.price}${room.currency}/kun\n✨ Xususiyatlari: ${room.features.join(', ')}\n📝 ${room.description}`
    })),
    
    amenities: siteData.amenities.map(amenity => ({
      prompt: [`${amenity} haqida`, `${amenity}`],
      response: `✅ ${amenity} - mehmonxonamizda mavjud xizmatlardan biri`
    })),
    
    services: siteData.services.map(service => ({
      prompt: [`${service.name} haqida`, `${service.name}`],
      response: `🏢 ${service.name}\n📝 ${service.description}${service.hours ? `\n🕐 ${service.hours}` : ''}${service.price ? `\n💰 ${service.price}` : ''}`
    })),
    
    general: [
      {
        prompt: ['mehmonxona haqida', 'siz haqingizda', 'stylo residence'],
        response: `🏨 ${siteData.aboutInfo}\n📍 ${siteData.contactInfo.address}\n📞 ${siteData.contactInfo.phone}\n✉️ ${siteData.contactInfo.email}`
      }
    ]
  };
  
  return trainingData;
};