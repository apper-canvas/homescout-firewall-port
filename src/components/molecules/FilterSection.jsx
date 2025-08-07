import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const FilterSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
      >
        {title}
        <ApperIcon 
          name="ChevronDown" 
          size={20} 
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </Button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default FilterSection