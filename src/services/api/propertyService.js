import propertyData from "@/services/mockData/properties.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(300)
    return [...propertyData].map(property => ({ ...property }))
  },

  async getById(id) {
    await delay(200)
    const property = propertyData.find(p => p.Id === id)
    if (!property) {
      throw new Error("Property not found")
    }
    return { ...property }
  },

  async create(propertyData) {
    await delay(500)
    const maxId = Math.max(...propertyData.map(p => p.Id), 0)
    const newProperty = {
      ...propertyData,
      Id: maxId + 1,
      listingDate: new Date().toISOString()
    }
    return { ...newProperty }
  },

  async update(id, updatedData) {
    await delay(300)
    const propertyIndex = propertyData.findIndex(p => p.Id === id)
    if (propertyIndex === -1) {
      throw new Error("Property not found")
    }
    
    propertyData[propertyIndex] = { ...propertyData[propertyIndex], ...updatedData }
    return { ...propertyData[propertyIndex] }
  },

  async delete(id) {
    await delay(400)
    const propertyIndex = propertyData.findIndex(p => p.Id === id)
    if (propertyIndex === -1) {
      throw new Error("Property not found")
    }
    
    const deletedProperty = { ...propertyData[propertyIndex] }
    propertyData.splice(propertyIndex, 1)
    return deletedProperty
  }
}