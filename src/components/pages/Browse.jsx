import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import PropertyCard from "@/components/organisms/PropertyCard"
import FilterSidebar from "@/components/organisms/FilterSidebar"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { propertyService } from "@/services/api/propertyService"

const Browse = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [viewType, setViewType] = useState("grid")

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    propertyType: "",
    bedroomsMin: "",
    bathroomsMin: "",
    location: "",
    sortBy: "newest"
  })

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError("")
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
      const data = await propertyService.getAll()
      setProperties(data)
      setFilteredProperties(data)
    } catch (err) {
      setError("Failed to load properties")
      console.error("Error loading properties:", err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...properties]

    // Price filter
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceMax))
    }

    // Type filter
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType)
    }

    // Bedrooms filter
    if (filters.bedroomsMin) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedroomsMin))
    }

    // Bathrooms filter
    if (filters.bathroomsMin) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.bathroomsMin))
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.address.state.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "size":
        filtered.sort((a, b) => b.squareFeet - a.squareFeet)
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
        break
    }

    setFilteredProperties(filtered)
    setIsFilterOpen(false)
    toast.success(`Found ${filtered.length} properties`)
  }

  const clearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      propertyType: "",
      bedroomsMin: "",
      bathroomsMin: "",
      location: "",
      sortBy: "newest"
    })
    setSortBy("newest")
    setFilteredProperties(properties)
    setIsFilterOpen(false)
    toast.info("Filters cleared")
  }

  const toggleFavorite = async (propertyId) => {
    try {
      const property = properties.find(p => p.Id === propertyId)
      const updatedProperty = await propertyService.update(propertyId, {
        ...property,
        isFavorited: !property.isFavorited
      })
      
      const updatedProperties = properties.map(p => 
        p.Id === propertyId ? updatedProperty : p
      )
      setProperties(updatedProperties)
      setFilteredProperties(filteredProperties.map(p => 
        p.Id === propertyId ? updatedProperty : p
      ))

      toast.success(
        updatedProperty.isFavorited ? "Added to favorites" : "Removed from favorites"
      )
    } catch (err) {
      toast.error("Failed to update favorite")
      console.error("Error toggling favorite:", err)
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    // Apply sorting immediately
    let sorted = [...filteredProperties]
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "size":
        sorted.sort((a, b) => b.squareFeet - a.squareFeet)
        break
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
        break
    }
    setFilteredProperties(sorted)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProperties} type="network" />

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-20 h-[calc(100vh-5rem)]">
            <FilterSidebar
              isOpen={true}
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gradient mb-2">
                  Discover Your Dream Home
                </h1>
                <p className="text-gray-600">
                  {filteredProperties.length} properties available
                </p>
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Filter" size={20} />
                <span className="ml-2">Filters</span>
              </Button>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-48"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="size">Largest First</option>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewType === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("grid")}
                >
                  <ApperIcon name="Grid3X3" size={18} />
                </Button>
                <Button
                  variant={viewType === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("list")}
                >
                  <ApperIcon name="List" size={18} />
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
              <Empty type="search" />
            ) : (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewType === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "grid-cols-1 max-w-4xl"
                }`}
              >
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.Id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard
                      property={property}
                      onFavoriteToggle={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse