import React, { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import PriceRange from "@/components/molecules/PriceRange"
import FilterSection from "@/components/molecules/FilterSection"
import ApperIcon from "@/components/ApperIcon"

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    type: true,
    rooms: true,
    location: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:relative lg:translate-x-0 lg:shadow-none"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            <FilterSection
              title="Price Range"
              isOpen={openSections.price}
              onToggle={() => toggleSection("price")}
            >
              <PriceRange
                minPrice={filters.priceMin}
                maxPrice={filters.priceMax}
                onMinChange={(value) => updateFilter("priceMin", value)}
                onMaxChange={(value) => updateFilter("priceMax", value)}
              />
            </FilterSection>

            <FilterSection
              title="Property Type"
              isOpen={openSections.type}
              onToggle={() => toggleSection("type")}
            >
              <Select
                value={filters.propertyType}
                onChange={(e) => updateFilter("propertyType", e.target.value)}
              >
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
              </Select>
            </FilterSection>

            <FilterSection
              title="Bedrooms & Bathrooms"
              isOpen={openSections.rooms}
              onToggle={() => toggleSection("rooms")}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Minimum Bedrooms
                  </label>
                  <Select
                    value={filters.bedroomsMin}
                    onChange={(e) => updateFilter("bedroomsMin", e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Minimum Bathrooms
                  </label>
                  <Select
                    value={filters.bathroomsMin}
                    onChange={(e) => updateFilter("bathroomsMin", e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </Select>
                </div>
              </div>
            </FilterSection>

            <FilterSection
              title="Location"
              isOpen={openSections.location}
              onToggle={() => toggleSection("location")}
            >
              <Select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Seattle">Seattle</option>
                <option value="Portland">Portland</option>
                <option value="Denver">Denver</option>
                <option value="Austin">Austin</option>
              </Select>
            </FilterSection>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <Button
              onClick={onApplyFilters}
              className="w-full"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              Clear All
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar