import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message, onRetry, type = "general" }) => {
  const getErrorContent = () => {
    switch (type) {
      case "property":
        return {
          title: "Property Not Found",
          description: "The property you're looking for doesn't exist or has been removed.",
          icon: "Home"
        }
      case "network":
        return {
          title: "Connection Error",
          description: "Unable to load properties. Please check your internet connection.",
          icon: "Wifi"
        }
      default:
        return {
          title: "Something Went Wrong",
          description: message || "We encountered an error while loading the content.",
          icon: "AlertTriangle"
        }
    }
  }

  const errorContent = getErrorContent()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px] max-w-md mx-auto text-center p-8"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name={errorContent.icon} size={48} className="text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {errorContent.title}
      </h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        {errorContent.description}
      </p>
      
      {onRetry && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onRetry}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" size={20} />
            <span>Try Again</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Error