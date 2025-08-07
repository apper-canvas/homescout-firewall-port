import React from "react"
import ApperIcon from "@/components/ApperIcon"

const PropertyStats = ({ bedrooms, bathrooms, squareFeet, className }) => {
  const stats = [
    { icon: "Bed", value: bedrooms, label: "bed" },
    { icon: "Bath", value: bathrooms, label: "bath" },
    { icon: "Square", value: squareFeet?.toLocaleString(), label: "sqft" }
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-1 text-gray-600">
          <ApperIcon name={stat.icon} size={16} />
          <span className="text-sm font-medium">
            {stat.value} {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default PropertyStats