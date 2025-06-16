"use client"

import { useState } from "react"
import { Search, MapPin, Bed, Bath, GraduationCap, Heart, Phone, Mail, Filter, Sparkles, Plus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Initial seed listings
const initialListings = [
  {
    id: 1,
    title: "Modern Studio Near University Campus",
    price: 850,
    location: "Downtown Campus Area",
    university: "State University",
    distance: "0.3 miles",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    utilitiesIncluded: true,
    amenities: ["WiFi", "Laundry", "Parking", "Study Area"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@rentals.com",
    },
    description:
      "Perfect for international students! Fully furnished studio with all utilities included. Walking distance to campus.",
    available: "Available Now",
  },
  {
    id: 2,
    title: "Shared 2BR Apartment - Student Friendly",
    price: 650,
    location: "University District",
    university: "Tech Institute",
    distance: "0.5 miles",
    bedrooms: 2,
    bathrooms: 1,
    furnished: true,
    utilitiesIncluded: false,
    amenities: ["WiFi", "Kitchen", "Study Room", "Bike Storage"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      email: "mike@studenthousing.com",
    },
    description: "Share with another international student. Great community atmosphere with study spaces.",
    available: "Available Jan 1st",
  },
  {
    id: 3,
    title: "Cozy 1BR with Kitchen - All Inclusive",
    price: 950,
    location: "Riverside Campus",
    university: "Community College",
    distance: "0.2 miles",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    utilitiesIncluded: true,
    amenities: ["WiFi", "Kitchen", "Parking", "Gym Access"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "Emma Rodriguez",
      phone: "+1 (555) 456-7890",
      email: "emma@riverside-rentals.com",
    },
    description:
      "All-inclusive rent with utilities, WiFi, and parking. Perfect for students who want hassle-free living.",
    available: "Available Now",
  },
  {
    id: 4,
    title: "Budget-Friendly Shared House",
    price: 550,
    location: "Student Village",
    university: "State University",
    distance: "1.2 miles",
    bedrooms: 4,
    bathrooms: 2,
    furnished: true,
    utilitiesIncluded: false,
    amenities: ["WiFi", "Large Kitchen", "Garden", "Bus Stop Nearby"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "David Park",
      phone: "+1 (555) 321-0987",
      email: "david@studentvillage.com",
    },
    description: "Affordable option for budget-conscious students. Share with 3 other international students.",
    available: "Available Feb 15th",
  },
  {
    id: 5,
    title: "Premium Studio with Study Space",
    price: 1200,
    location: "Medical District",
    university: "Medical School",
    distance: "0.1 miles",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    utilitiesIncluded: true,
    amenities: ["WiFi", "Study Desk", "Parking", "Security", "Gym"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "Lisa Wang",
      phone: "+1 (555) 654-3210",
      email: "lisa@premiumstudent.com",
    },
    description: "Premium accommodation for graduate students. Quiet environment perfect for studying.",
    available: "Available Now",
  },
  {
    id: 6,
    title: "Affordable Room in Student House",
    price: 480,
    location: "Arts Quarter",
    university: "Arts College",
    distance: "0.8 miles",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    utilitiesIncluded: true,
    amenities: ["WiFi", "Shared Kitchen", "Art Studio", "Bike Parking"],
    image: "/placeholder.svg?height=200&width=300",
    landlord: {
      name: "Alex Thompson",
      phone: "+1 (555) 789-0123",
      email: "alex@artshousing.com",
    },
    description: "Creative environment for arts students. Shared spaces foster collaboration and friendship.",
    available: "Available Mar 1st",
  },
]

export default function StudentRentals() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [university, setUniversity] = useState("")
  const [furnished, setFurnished] = useState(false)
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [listings, setListings] = useState(initialListings)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAIForm, setShowAIForm] = useState(false)
  
  // AI generation criteria
  const [aiCriteria, setAiCriteria] = useState({
    location: "",
    maxPrice: "",
    university: "",
    bedrooms: "",
    preferences: ""
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const generateListingsWithAI = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria: aiCriteria }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate listings')
      }
      
      const newListings = await response.json()
      
      // Add unique IDs and images to the new listings
      const listingsWithIds = newListings.map((listing: any, index: number) => ({
        ...listing,
        id: Date.now() + index,
        image: "/placeholder.svg?height=200&width=300"
      }))
      
      // Add new listings to the top of the list
      setListings(prevListings => [...listingsWithIds, ...prevListings])
      setShowAIForm(false)
      
      // Reset form
      setAiCriteria({
        location: "",
        maxPrice: "",
        university: "",
        bedrooms: "",
        preferences: ""
      })
      
      // Show success message
      alert(`Successfully generated ${newListings.length} new listings!`)
      
    } catch (error) {
      console.error('Error generating listings:', error)
      alert(error instanceof Error ? error.message : 'Failed to generate listings. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice =
      !priceRange ||
      (priceRange === "under-600" && listing.price < 600) ||
      (priceRange === "600-800" && listing.price >= 600 && listing.price <= 800) ||
      (priceRange === "800-1000" && listing.price >= 800 && listing.price <= 1000) ||
      (priceRange === "over-1000" && listing.price > 1000)
    const matchesUniversity = !university || listing.university === university
    const matchesFurnished = !furnished || listing.furnished
    const matchesUtilities = !utilitiesIncluded || listing.utilitiesIncluded

    return matchesSearch && matchesPrice && matchesUniversity && matchesFurnished && matchesUtilities
  })

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-blue-400">StudentRentals</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Browse
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                List Property
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Help
              </a>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Find Your Perfect Student Home</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover student-friendly rentals near your university. Furnished, affordable, and perfect for international
            students.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">
                    All Universities
                  </SelectItem>
                  <SelectItem value="State University" className="text-white hover:bg-gray-700">
                    State University
                  </SelectItem>
                  <SelectItem value="Tech Institute" className="text-white hover:bg-gray-700">
                    Tech Institute
                  </SelectItem>
                  <SelectItem value="Community College" className="text-white hover:bg-gray-700">
                    Community College
                  </SelectItem>
                  <SelectItem value="Medical School" className="text-white hover:bg-gray-700">
                    Medical School
                  </SelectItem>
                  <SelectItem value="Arts College" className="text-white hover:bg-gray-700">
                    Arts College
                  </SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto border-gray-600 text-white hover:bg-gray-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filter Properties</SheetTitle>
                    <SheetDescription className="text-gray-400">
                      Narrow down your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium text-white">Price Range</Label>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="any" className="text-white hover:bg-gray-700">
                            Any Price
                          </SelectItem>
                          <SelectItem value="under-600" className="text-white hover:bg-gray-700">
                            Under $600
                          </SelectItem>
                          <SelectItem value="600-800" className="text-white hover:bg-gray-700">
                            $600 - $800
                          </SelectItem>
                          <SelectItem value="800-1000" className="text-white hover:bg-gray-700">
                            $800 - $1000
                          </SelectItem>
                          <SelectItem value="over-1000" className="text-white hover:bg-gray-700">
                            Over $1000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-white">Preferences</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="furnished"
                          checked={furnished}
                          onCheckedChange={setFurnished}
                          className="border-gray-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="furnished" className="text-gray-300">
                          Furnished Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="utilities"
                          checked={utilitiesIncluded}
                          onCheckedChange={setUtilitiesIncluded}
                          className="border-gray-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="utilities" className="text-gray-300">
                          Utilities Included
                        </Label>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-white">Available Properties</h3>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAIForm(!showAIForm)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate with AI
              </Button>
              <p className="text-gray-400">{filteredListings.length} properties found</p>
            </div>
          </div>

          {/* AI Generation Form */}
          {showAIForm && (
            <Card className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <h4 className="text-lg font-semibold text-white">Generate Custom Listings with AI</h4>
                </div>
                <p className="text-gray-300">Tell us what you're looking for and we'll generate personalized apartment listings for you.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="ai-location" className="text-white">Preferred Location</Label>
                    <Input
                      id="ai-location"
                      placeholder="e.g., Downtown, Near campus, Quiet neighborhood"
                      value={aiCriteria.location}
                      onChange={(e) => setAiCriteria(prev => ({ ...prev, location: e.target.value }))}
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ai-price" className="text-white">Maximum Price</Label>
                    <Input
                      id="ai-price"
                      placeholder="e.g., $800, Under $1000"
                      value={aiCriteria.maxPrice}
                      onChange={(e) => setAiCriteria(prev => ({ ...prev, maxPrice: e.target.value }))}
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ai-university" className="text-white">University</Label>
                    <Input
                      id="ai-university"
                      placeholder="e.g., Stanford University, MIT"
                      value={aiCriteria.university}
                      onChange={(e) => setAiCriteria(prev => ({ ...prev, university: e.target.value }))}
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ai-bedrooms" className="text-white">Bedrooms</Label>
                    <Select value={aiCriteria.bedrooms} onValueChange={(value) => setAiCriteria(prev => ({ ...prev, bedrooms: value }))}>
                      <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="studio" className="text-white hover:bg-gray-700">Studio</SelectItem>
                        <SelectItem value="1" className="text-white hover:bg-gray-700">1 Bedroom</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-gray-700">2 Bedrooms</SelectItem>
                        <SelectItem value="3+" className="text-white hover:bg-gray-700">3+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="ai-preferences" className="text-white">Additional Preferences</Label>
                  <Input
                    id="ai-preferences"
                    placeholder="e.g., Pet-friendly, Gym access, Modern kitchen, Balcony"
                    value={aiCriteria.preferences}
                    onChange={(e) => setAiCriteria(prev => ({ ...prev, preferences: e.target.value }))}
                    className="mt-1 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={generateListingsWithAI}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Listings
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAIForm(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gray-800 border-gray-700 hover:border-blue-500"
              >
                <div className="relative">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white"
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white">{listing.available}</Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg leading-tight text-white">{listing.title}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">${listing.price}</div>
                      <div className="text-sm text-gray-400">per month</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-white">{listing.university}</span>
                    <span className="text-gray-400">• {listing.distance}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{listing.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{listing.bathrooms} bath</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {listing.furnished && (
                      <Badge variant="secondary" className="bg-blue-900 text-blue-200">
                        Furnished
                      </Badge>
                    )}
                    {listing.utilitiesIncluded && (
                      <Badge variant="secondary" className="bg-green-900 text-green-200">
                        Utilities Included
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {amenity}
                      </Badge>
                    ))}
                    {listing.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{listing.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2">{listing.description}</p>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No properties match your search criteria.</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-lg text-white">StudentRentals</span>
              </div>
              <p className="text-gray-400">
                Connecting international students with perfect rental homes near their universities.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-white">For Students</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Browse Rentals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Student Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Safety Tips
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-white">For Landlords</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    List Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Landlord Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-white">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StudentRentals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
