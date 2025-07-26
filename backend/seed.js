// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Provider = require("./models/Providers");

const dummyProviders = [
  {
    name: "Suresh Plumbers",
    category: "Plumber",
    contact: "9876543210",
    location: { lat: 19.2288, lon: 72.9781 },
    operatingHours: "8:00 AM - 8:00 PM",
  },
  {
    name: "Prakash Electric Works",
    category: "Electrician",
    contact: "9123456780",
    location: { lat: 19.2183, lon: 72.9781 },
    operatingHours: "9:00 AM - 6:00 PM",
  },
  {
    name: "Maa's Kitchen",
    category: "Tiffin Service",
    contact: "8877665544",
    location: { lat: 19.2363, lon: 72.9694 },
    operatingHours: "11:00 AM - 9:00 PM",
  },
  {
    name: "Perfect Fit Tailors",
    category: "Tailor",
    contact: "9988776655",
    location: { lat: 19.2063, lon: 72.9594 },
    operatingHours: "10:00 AM - 8:00 PM",
  },
  {
    name: "Krishna Carpentry",
    category: "Carpenter",
    contact: "7766554433",
    location: { lat: 19.235, lon: 72.975 },
    operatingHours: "9:00 AM - 7:00 PM",
  },
  {
    name: "AquaFlow Plumbing",
    category: "Plumber",
    contact: "9876543211",
    location: { lat: 19.2195, lon: 72.9635 },
    operatingHours: "24/7",
  },
  {
    name: "Ghar Ka Khana",
    category: "Tiffin Service",
    contact: "8877665545",
    location: { lat: 19.2075, lon: 72.9705 },
    operatingHours: "12:00 PM - 10:00 PM",
  },
  {
    name: "Spark Electricals",
    category: "Electrician",
    contact: "9123456781",
    location: { lat: 19.195, lon: 72.978 },
    operatingHours: "9:00 AM - 9:00 PM",
  },
  {
    name: "Anil's Woodcraft",
    category: "Carpenter",
    contact: "7766554434",
    location: { lat: 19.245, lon: 72.965 },
    operatingHours: "10:00 AM - 6:00 PM",
  },
  {
    name: "Style Stitch",
    category: "Tailor",
    contact: "9988776656",
    location: { lat: 19.225, lon: 72.985 },
    operatingHours: "10:00 AM - 9:00 PM",
  },
  {
    name: "QuickFix Plumbers",
    category: "Plumber",
    contact: "9876543212",
    location: { lat: 19.1852, lon: 72.9722 },
    operatingHours: "9:00 AM - 5:00 PM",
  },
  {
    name: "Volt Masters",
    category: "Electrician",
    contact: "9123456782",
    location: { lat: 19.2555, lon: 72.9791 },
    operatingHours: "8:00 AM - 10:00 PM",
  },
  {
    name: "Healthy Bites",
    category: "Tiffin Service",
    contact: "8877665546",
    location: { lat: 19.2133, lon: 72.9581 },
    operatingHours: "10:00 AM - 3:00 PM",
  },
  {
    name: "Classic Tailoring",
    category: "Tailor",
    contact: "9988776657",
    location: { lat: 19.2001, lon: 72.9633 },
    operatingHours: "11:00 AM - 7:00 PM",
  },
  {
    name: "FineWood Furnishers",
    category: "Carpenter",
    contact: "7766554435",
    location: { lat: 19.1999, lon: 72.9899 },
    operatingHours: "9:00 AM - 7:00 PM",
  },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected for seeding...");

  await Provider.deleteMany({});
  console.log("Old providers removed.");

  await Provider.insertMany(dummyProviders);
  console.log("Database seeded with new providers!");

  mongoose.connection.close();
};

seedDB().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
