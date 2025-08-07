import React, { useState } from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search by location, property type..." }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pr-12"
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2"
      >
        <ApperIcon name="Search" size={20} />
      </Button>
    </form>
  )
}

export default SearchBar