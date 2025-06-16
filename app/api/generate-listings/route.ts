import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Define the schema for apartment listings
const listingSchema = z.object({
  title: z.string(),
  price: z.number(),
  location: z.string(),
  university: z.string(),
  distance: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  furnished: z.boolean(),
  utilitiesIncluded: z.boolean(),
  amenities: z.array(z.string()),
  landlord: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  description: z.string(),
  available: z.string(),
});

const listingsArraySchema = z.object({
  listings: z.array(listingSchema),
});

export async function POST(req: Request) {
  try {
    const { criteria } = await req.json();
    
    const prompt = `Generate 3-5 realistic apartment listings for students based on these criteria: ${JSON.stringify(criteria)}
    
    Make the listings diverse with varied:
    - Pricing (realistic for student budgets)
    - Locations (different neighborhoods/areas)
    - Amenities (WiFi, laundry, parking, gym, study areas, etc.)
    - Property types (studio, 1BR, 2BR, shared housing)
    - Landlord details (realistic names, phone numbers, emails)
    - Distances from university (0.1 to 2 miles)
    
    Ensure all listings are student-friendly and match the provided criteria as closely as possible.`;

    const result = await generateObject({
      model: openai("gpt-4o"),
      messages: [{ role: "user", content: prompt }],
      schema: listingsArraySchema,
      temperature: 0.7,
    });

    return new Response(JSON.stringify(result.object.listings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating listings:", error);
    return new Response(JSON.stringify({ error: "Failed to generate listings" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 