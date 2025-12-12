export interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  image: string
  experience: number
  location: string
  fee: number
  availability: string[]
  bio: string
}

export interface Appointment {
  id: string
  doctorId: string
  userId: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  notes: string
}

export interface Specialty {
  id: string
  name: string
  icon: string
  count: number
}

export interface Medicine {
  id: string
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  inStock: boolean
}

export const specialties: Specialty[] = [
  { id: "1", name: "Cardiology", icon: "❤️", count: 45 },
  { id: "2", name: "Dermatology", icon: "🩹", count: 38 },
  { id: "3", name: "Neurology", icon: "🧠", count: 32 },
  { id: "4", name: "Orthopedics", icon: "🦴", count: 41 },
  { id: "5", name: "Pediatrics", icon: "👶", count: 29 },
  { id: "6", name: "Psychiatry", icon: "💭", count: 25 },
]

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 156,
    image: "/female-doctor-cardiology.jpg",
    experience: 12,
    location: "New York, NY",
    fee: 150,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    bio: "Specialized in heart disease prevention and treatment with 12 years of experience.",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.7,
    reviews: 128,
    image: "/male-doctor-dermatology.jpg",
    experience: 10,
    location: "Los Angeles, CA",
    fee: 120,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    bio: "Expert in skin conditions and cosmetic dermatology.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Neurology",
    rating: 4.9,
    reviews: 189,
    image: "/female-doctor-neurology.jpg",
    experience: 15,
    location: "Chicago, IL",
    fee: 180,
    availability: ["Tuesday", "Thursday", "Friday", "Saturday"],
    bio: "Leading neurologist specializing in migraine and neurological disorders.",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    rating: 4.6,
    reviews: 142,
    image: "/male-doctor-orthopedics.jpg",
    experience: 14,
    location: "Houston, TX",
    fee: 160,
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    bio: "Specialist in joint replacement and sports medicine.",
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "Pediatrics",
    rating: 4.8,
    reviews: 167,
    image: "/female-doctor-pediatrics.jpg",
    experience: 11,
    location: "Phoenix, AZ",
    fee: 100,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bio: "Compassionate pediatrician dedicated to child health and wellness.",
  },
  {
    id: "6",
    name: "Dr. Robert Martinez",
    specialty: "Psychiatry",
    rating: 4.7,
    reviews: 134,
    image: "/male-doctor-psychiatry.jpg",
    experience: 13,
    location: "Miami, FL",
    fee: 140,
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bio: "Experienced psychiatrist providing mental health support and therapy.",
  },
]

export const medicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 5.99,
    rating: 4.8,
    reviews: 245,
    image: "/medicine-1.jpg",
    description: "Effective pain relief for headaches, muscle aches, and fever.",
    inStock: true
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 12.50,
    rating: 4.6,
    reviews: 120,
    image: "/medicine-2.jpg",
    description: "Antibiotic used to treat various bacterial infections.",
    inStock: true
  },
  {
    id: "3",
    name: "Vitamin C 1000mg",
    category: "Supplements",
    price: 8.99,
    rating: 4.9,
    reviews: 500,
    image: "/medicine-3.jpg",
    description: "Boosts immune system and promotes overall health.",
    inStock: true
  },
  {
    id: "4",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 6.50,
    rating: 4.7,
    reviews: 180,
    image: "/medicine-4.jpg",
    description: "Anti-inflammatory drug for pain and swelling relief.",
    inStock: true
  },
  {
    id: "5",
    name: "Cetirizine 10mg",
    category: "Allergy",
    price: 9.99,
    rating: 4.5,
    reviews: 320,
    image: "/medicine-5.jpg",
    description: "Relieves allergy symptoms like runny nose and sneezing.",
    inStock: true
  },
  {
    id: "6",
    name: "Omega-3 Fish Oil",
    category: "Supplements",
    price: 15.99,
    rating: 4.8,
    reviews: 410,
    image: "/medicine-6.jpg",
    description: "Supports heart health and brain function.",
    inStock: false
  },
  {
  id: "7",
  name: "Aspirin 325mg",
  category: "Pain Relief",
  price: 7.49,
  rating: 4.4,
  reviews: 210,
  image: "/medicine-7.jpg",
  description: "Used to reduce pain, fever, and inflammation.",
  inStock: true
},
{
  id: "8",
  name: "Metformin 500mg",
  category: "Diabetes",
  price: 14.99,
  rating: 4.6,
  reviews: 190,
  image: "/medicine-8.jpg",
  description: "Controls high blood sugar in patients with type 2 diabetes.",
  inStock: true
},
{
  id: "9",
  name: "Atorvastatin 10mg",
  category: "Heart Care",
  price: 18.75,
  rating: 4.7,
  reviews: 260,
  image: "/medicine-9.jpg",
  description: "Helps reduce cholesterol and protect heart health.",
  inStock: true
},
{
  id: "10",
  name: "Pantoprazole 40mg",
  category: "Digestive Care",
  price: 10.99,
  rating: 4.5,
  reviews: 175,
  image: "/medicine-10.jpg",
  description: "Reduces stomach acid and treats acid reflux.",
  inStock: true
},
{
  id: "11",
  name: "Insulin Injection",
  category: "Diabetes",
  price: 35.99,
  rating: 4.8,
  reviews: 98,
  image: "/medicine-11.jpg",
  description: "Regulates blood sugar levels in diabetic patients.",
  inStock: true
},
{
  id: "12",
  name: "Losartan 50mg",
  category: "Blood Pressure",
  price: 13.49,
  rating: 4.6,
  reviews: 143,
  image: "/medicine-12.jpg",
  description: "Treats high blood pressure and protects kidneys.",
  inStock: true
},
{
  id: "13",
  name: "Azithromycin 500mg",
  category: "Antibiotics",
  price: 16.99,
  rating: 4.7,
  reviews: 225,
  image: "/medicine-13.jpg",
  description: "Powerful antibiotic for bacterial infections.",
  inStock: true
},
{
  id: "14",
  name: "Calcium + Vitamin D",
  category: "Supplements",
  price: 11.49,
  rating: 4.8,
  reviews: 365,
  image: "/medicine-14.jpg",
  description: "Strengthens bones and supports joint health.",
  inStock: true
},
{
  id: "15",
  name: "Cough Syrup DX",
  category: "Cold & Flu",
  price: 6.99,
  rating: 4.3,
  reviews: 144,
  image: "/medicine-15.jpg",
  description: "Relieves dry cough and throat irritation.",
  inStock: true
},
{
  id: "16",
  name: "ORS Electrolyte Sachets",
  category: "Digestive Care",
  price: 4.99,
  rating: 4.9,
  reviews: 520,
  image: "/medicine-16.jpg",
  description: "Prevents dehydration and restores body fluids.",
  inStock: true
},
{
  id: "17",
  name: "Multivitamin Tablets",
  category: "Supplements",
  price: 9.49,
  rating: 4.7,
  reviews: 600,
  image: "/medicine-17.jpg",
  description: "Daily vitamins for overall health and immunity.",
  inStock: true
},
{
  id: "18",
  name: "Salbutamol Inhaler",
  category: "Respiratory",
  price: 22.99,
  rating: 4.8,
  reviews: 155,
  image: "/medicine-18.jpg",
  description: "Provides quick relief from asthma and breathing issues.",
  inStock: true
},
{
  id: "19",
  name: "Levothyroxine 50mcg",
  category: "Thyroid",
  price: 8.29,
  rating: 4.6,
  reviews: 175,
  image: "/medicine-19.jpg",
  description: "Treats hypothyroidism and regulates thyroid levels.",
  inStock: true
},
{
  id: "20",
  name: "Iron Folic Acid Tablets",
  category: "Supplements",
  price: 7.99,
  rating: 4.5,
  reviews: 340,
  image: "/medicine-20.jpg",
  description: "Prevents anemia and boosts hemoglobin levels.",
  inStock: false
}

]

export const symptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Sore Throat",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Skin Rash",
  "Joint Pain",
  "Insomnia",
]
