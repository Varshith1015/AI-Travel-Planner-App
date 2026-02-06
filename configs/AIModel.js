import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

const apiKey= process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model:"gemini-2.5-flash",
});

const generateConfig={
    temperature:1,
    topP:0.95,
    topK:64,
    maxOutputTokens:8192,
    responseMimeType:"application/json",
};


export const chatSession =model.startChat({
    generationConfig:generateConfig,
    history:[
        {
      role: "user",
      parts: [
            {
            text: "Generate Travel Plan for Location: '{location}', for '{totalDays}' Days and '{totalNights}' Nights for '{traveller}' with a '{budget}' budget with a Flight details,Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions about Places to visit nearby with PlaceName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, time To travel each of the location for'{totalDays}' days and '{totalNights}' night with each day plan with best time to visit in JSON Format.",
            },
        ],
      },  
       {
      role: "model",
        parts: [
            
            {
            text: JSON.stringify({
              travelPlan: {
                location: "Zürich, Switzerland",
                duration: "3 Days, 2 Nights",
                travelers: "1 Person",
                budget: "Cheap",
                flights: {
                  airline: "Swiss International Air Lines",
                  flightNumber: "LX123",
                  departure: "2024-06-15 08:00",
                  arrival: "2024-06-15 10:30",
                  price: "$350",
                  bookingUrl: "https://www.swiss.com/booking"
                },
                hotels: [
                  {
                    hotelName: "Budget Hotel Zürich",
                    hotelAddress: "Limmatstrasse 118, 8005 Zürich",
                    price: "$80/night",
                    hotelImageUrl: "https://example.com/hotel1.jpg",
                    geoCoordinates: { latitude: 47.3847, longitude: 8.5266 },
                    rating: 4.2,
                    description: "Clean and affordable hotel near city center"
                  },
                  {
                    hotelName: "City Hostel Zürich",
                    hotelAddress: "Stampfenbachstrasse 8, 8001 Zürich",
                    price: "$60/night",
                    hotelImageUrl: "https://example.com/hotel2.jpg",
                    geoCoordinates: { latitude: 47.3769, longitude: 8.5417 },
                    rating: 4.0,
                    description: "Budget-friendly hostel with great atmosphere"
                  }
                ],
                itinerary: [
                  {
                    day: 1,
                    title: "Explore Old Town",
                    places: [
                      {
                        placeName: "Grossmünster",
                        placeDetails: "Historic Protestant church with twin towers",
                        placeImageUrl: "https://example.com/grossmunster.jpg",
                        geoCoordinates: { latitude: 47.3703, longitude: 8.5442 },
                        ticketPricing: "$5",
                        timeToTravel: "30 minutes",
                        bestTimeToVisit: "9:00 AM - 11:00 AM"
                      },
                      {
                        placeName: "Lake Zürich",
                        placeDetails: "Beautiful lake with scenic views",
                        placeImageUrl: "https://example.com/lake.jpg",
                        geoCoordinates: { latitude: 47.3667, longitude: 8.5500 },
                        ticketPricing: "Free",
                        timeToTravel: "1 hour",
                        bestTimeToVisit: "2:00 PM - 5:00 PM"
                      }
                    ]
                  },
                  {
                    day: 2,
                    title: "Museums and Culture",
                    places: [
                      {
                        placeName: "Swiss National Museum",
                        placeDetails: "Museum showcasing Swiss cultural history",
                        placeImageUrl: "https://example.com/museum.jpg",
                        geoCoordinates: { latitude: 47.3789, longitude: 8.5403 },
                        ticketPricing: "$12",
                        timeToTravel: "2 hours",
                        bestTimeToVisit: "10:00 AM - 1:00 PM"
                      },
                      {
                        placeName: "Bahnhofstrasse",
                        placeDetails: "Famous shopping street",
                        placeImageUrl: "https://example.com/bahnhof.jpg",
                        geoCoordinates: { latitude: 47.3686, longitude: 8.5391 },
                        ticketPricing: "Free",
                        timeToTravel: "1.5 hours",
                        bestTimeToVisit: "3:00 PM - 6:00 PM"
                      }
                    ]
                  },
                  {
                    day: 3,
                    title: "Nature and Departure",
                    places: [
                      {
                        placeName: "Uetliberg Mountain",
                        placeDetails: "Mountain offering panoramic city views",
                        placeImageUrl: "https://example.com/uetliberg.jpg",
                        geoCoordinates: { latitude: 47.3497, longitude: 8.4916 },
                        ticketPricing: "$8",
                        timeToTravel: "2 hours",
                        bestTimeToVisit: "8:00 AM - 11:00 AM"
                      }
                    ]
                  }
                ]
              }
            }),
            },
        ],
      },
    ]
});


