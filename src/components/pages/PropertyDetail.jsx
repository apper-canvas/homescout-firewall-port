import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { toast } from "react-toastify"
import PropertyGallery from "@/components/organisms/PropertyGallery"
import PropertyStats from "@/components/molecules/PropertyStats"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { propertyService } from "@/services/api/propertyService"

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError("")
      await new Promise(resolve => setTimeout(resolve, 800))
      const data = await propertyService.getById(parseInt(id))
      setProperty(data)
    } catch (err) {
      setError("Property not found")
      console.error("Error loading property:", err)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    try {
      const updatedProperty = await propertyService.update(property.Id, {
        ...property,
        isFavorited: !property.isFavorited
      })
      setProperty(updatedProperty)
      toast.success(
        updatedProperty.isFavorited ? "Added to favorites" : "Removed from favorites"
      )
    } catch (err) {
      toast.error("Failed to update favorite")
      console.error("Error toggling favorite:", err)
    }
  }

  const handleContact = () => {
    toast.success("Contact request sent! The agent will reach out soon.")
  }

  const handleScheduleTour = () => {
    toast.success("Tour scheduled! You'll receive confirmation details shortly.")
  }

  if (loading) return <Loading type="detail" />
  if (error || !property) return <Error message={error} onRetry={loadProperty} type="property" />

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Browse
          </Link>
          <ApperIcon name="ChevronRight" size={16} />
          <span className="text-gray-900">{property.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <PropertyGallery images={property.images} alt={property.title} />

            {/* Property Details */}
            <div className="mt-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="accent" className="bg-accent-500 text-white font-medium">
                      {property.type}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Listed {format(new Date(property.listingDate), "MMMM dd, yyyy")}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <ApperIcon name="MapPin" size={20} />
                    <span className="text-lg">
                      {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}
                    </span>
                  </div>

                  <div className="text-4xl font-bold price-gradient mb-6">
                    ${property.price.toLocaleString()}
                  </div>

                  <PropertyStats
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    squareFeet={property.squareFeet}
                    className="text-lg"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleFavorite}
                  className="ml-4"
                >
                  <ApperIcon 
                    name="Heart" 
                    size={24} 
                    className={property.isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"} 
                  />
                </Button>
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <ApperIcon name="Check" size={16} className="text-primary-600" />
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-card p-6 mb-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Interested in this property?
                </h3>
                
                <div className="space-y-4">
                  <Button
                    onClick={handleScheduleTour}
                    className="w-full"
                    size="lg"
                  >
                    <ApperIcon name="Calendar" size={20} className="mr-2" />
                    Schedule a Tour
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleContact}
                    className="w-full"
                    size="lg"
                  >
                    <ApperIcon name="MessageCircle" size={20} className="mr-2" />
                    Contact Agent
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Property ID</span>
                    <span className="font-mono">#{property.Id}</span>
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Location
                </h3>
                
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <ApperIcon name="MapPin" size={48} className="text-primary-600 mx-auto mb-2" />
                    <p className="text-sm text-primary-700 font-medium">Interactive Map</p>
                    <p className="text-xs text-primary-600">Coming Soon</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{property.address.city}, {property.address.state}</p>
                  <p>{property.address.street}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail