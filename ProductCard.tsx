export type UserRole = 'customer' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  membershipPlan?: 'none' | 'monthly' | 'quarterly' | 'annual';
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  composition?: string;
  images: string[];
  mrp: number;
  price: number;
  discount: number;
  stock: number;
  rxRequired: boolean;
  rating: {
    average: number;
    count: number;
  };
  description: string;
  sideEffects?: string;
  dosage?: string;
  manufacturer: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface LabTest {
  id: string;
  name: string;
  slug: string;
  category: string;
  parameters: string[];
  price: number;
  reportTime: string; // e.g., "6 hours"
  preparation: string;
  labPartner: string;
  homeCollection: boolean;
  image: string;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialization: string;
  degree: string;
  experience: number;
  languages: string[];
  fee: number;
  availability: string[]; // slots
  rating: {
    average: number;
    count: number;
  };
  patientCount: number;
  image: string;
  status: 'online' | 'offline' | 'busy';
}

export interface HealthArticle {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  reviewedBy?: string;
  category: string;
  tags: string[];
  body: string;
  readTime: string;
  publishedAt: string;
  thumbnail: string;
}
