import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import PropertyCard from "@/components/organisms/PropertyCard"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { propertyService } from "@/services/api/propertyService"

const Favorites = () => {
  const [properties, setProperties] = useState([])
  const [favoriteProperties, setFavoriteProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      setError("")
      await new Promise(resolve => setTimeout(resolve, 800))
      const allProperties = await propertyService.getAll()
      const favorites = allProperties.filter(property => property.isFavorited)
      setProperties(allProperties)
      setFavoriteProperties(favorites)
    } catch (err) {
      setError("Failed to load favorite properties")
      console.error("Error loading favorites:", err)
    } finally {
      setLoading(false)
    }
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
      
      // Update favorites list
      const updatedFavorites = updatedProperties.filter(p => p.isFavorited)
      setFavoriteProperties(updatedFavorites)

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
    let sorted = [...favoriteProperties]
    
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
      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
        break
    }
    
    setFavoriteProperties(sorted)
  }

  const clearAllFavorites = async () => {
    try {
      const promises = favoriteProperties.map(property =>
        propertyService.update(property.Id, { ...property, isFavorited: false })
      )
      await Promise.all(promises)
      
      const updatedProperties = properties.map(p => ({ ...p, isFavorited: false }))
      setProperties(updatedProperties)
      setFavoriteProperties([])
      
      toast.success("All favorites cleared")
    } catch (err) {
      toast.error("Failed to clear favorites")
      console.error("Error clearing favorites:", err)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadFavorites} type="network" />

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600">
              {favoriteProperties.length} saved properties
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <Button
              variant="outline"
              onClick={clearAllFavorites}
              className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
            >
              <ApperIcon name="Trash2" size={18} className="mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {favoriteProperties.length === 0 ? (
          <Empty type="favorites" />
        ) : (
          <>
            {/* Controls */}
            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-48"
                >
                  <option value="newest">Date Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="size">Largest First</option>
                  <option value="alphabetical">A to Z</option>
                </Select>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="Heart" size={16} className="text-red-500 fill-red-500" />
                <span>{favoriteProperties.length} favorites</span>
              </div>
            </div>

            {/* Properties Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favoriteProperties.map((property, index) => (
                <motion.div
                  key={property.Id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyCard
                    property={property}
                    onFavoriteToggle={toggleFavorite}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Favorites