import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ type = "properties" }) => {
  const getEmptyContent = () => {
    switch (type) {
      case "favorites":
        return {
          title: "No Favorites Yet",
          description: "Start exploring properties and save your favorites to see them here.",
          icon: "Heart",
          actionText: "Browse Properties",
          actionPath: "/",
          gradient: "from-pink-50 to-red-50"
        }
      case "search":
        return {
          title: "No Properties Found",
          description: "Try adjusting your search filters or explore different locations.",
          icon: "Search",
          actionText: "Clear Filters",
          actionPath: null,
          gradient: "from-blue-50 to-indigo-50"
        }
      default:
        return {
          title: "No Properties Available",
          description: "Check back later for new property listings in your area.",
          icon: "Home",
          actionText: "Refresh Page",
          actionPath: null,
          gradient: "from-green-50 to-primary-50"
        }
    }
  }

  const emptyContent = getEmptyContent()

  const handleAction = () => {
    if (!emptyContent.actionPath) {
      window.location.reload()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[500px] max-w-lg mx-auto text-center p-8"
    >
      <div className={`bg-gradient-to-br ${emptyContent.gradient} p-8 rounded-full mb-8`}>
        <ApperIcon name={emptyContent.icon} size={64} className="text-primary-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {emptyContent.title}
      </h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed text-lg">
        {emptyContent.description}
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {emptyContent.actionPath ? (
          <Button as={Link} to={emptyContent.actionPath} size="lg">
            <ApperIcon name="ArrowRight" size={20} className="mr-2" />
            {emptyContent.actionText}
          </Button>
        ) : (
          <Button onClick={handleAction} size="lg">
            <ApperIcon name="RotateCcw" size={20} className="mr-2" />
            {emptyContent.actionText}
          </Button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Empty