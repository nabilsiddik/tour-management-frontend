export interface ITourType {
  _id: string
  title: string
  description: string
  images: string[]
  costFrom: number
  startDate: string
  endDate: string
  departureLocation: string
  arrivalLocation: string
  included: string[]
  excluded: string[]
  tourPlan: string[]
  amenities: string[]
  maxGuest: number
  minAge: number
  division: string
  tourType: string
  createdAt: string
  updatedAt: string
  slug: string
}
