import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import PropertyImage from "@/components/molecules/PropertyImage"
import PropertyStats from "@/components/molecules/PropertyStats"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const PropertyCard = ({ property, onFavoriteToggle }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onFavoriteToggle(property.Id)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <Link to={`/property/${property.Id}`} className="block">
        <div className="relative">
          <PropertyImage
            images={property.images}
            alt={property.title}
            onFavoriteToggle={handleFavoriteClick}
            isFavorited={property.isFavorited}
            className="aspect-[4/3] w-full"
          />
          <Badge 
            variant="accent" 
            className="absolute top-3 left-3 bg-accent-500 text-white font-medium"
          >
            {property.type}
          </Badge>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1">
              {property.title}
            </h3>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold price-gradient">
                ${property.price.toLocaleString()}
              </p>
            </div>
          </div>

          <PropertyStats
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            className="mb-4"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="MapPin" size={16} />
              <span className="text-sm">
                {property.address.city}, {property.address.state}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Listed {format(new Date(property.listingDate), "MMM dd")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyCard