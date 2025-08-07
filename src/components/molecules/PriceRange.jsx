import React from "react"
import Input from "@/components/atoms/Input"

const PriceRange = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Price Range</label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
          <Input
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => onMinChange(e.target.value)}
            className="h-10"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
          <Input
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => onMaxChange(e.target.value)}
            className="h-10"
          />
        </div>
      </div>
    </div>
  )
}

export default PriceRange