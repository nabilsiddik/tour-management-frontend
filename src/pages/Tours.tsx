import Devider from "@/components/Devider"
import TourListItem from "@/components/TourListItem"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useAllDivisionsQuery } from "@/redux/features/division/division.api"
import { useGetToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import type { ITourType } from "@/types"
import { useEffect, useState } from "react"

interface ITour {
    _id: string,
    name: string,
}
interface IDivision {
    _id: string,
    name: string,
}


const Tours = () => {
    const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined)
    const [selectedTourType, setSelectedTourType,] = useState<string | undefined>(undefined)

    
    const { data: tours } = useGetToursQuery({division: selectedDivision, tourType: selectedTourType})

    const { data: tourTypes, isLoading: tourLoading } = useGetTourTypesQuery(undefined)
    const { data: divisions, isLoading: divisionLoading } = useAllDivisionsQuery(undefined)

    const allTourTypes = tourTypes?.map((type: ITour) => {
        return {
            value: type?._id,
            label: type?.name
        }
    }) ?? []

    // All divisions
    const allDivisions = divisions?.data?.map((type: IDivision) => {
        return {
            value: type?._id,
            label: type?.name
        }
    }) ?? []

    return (
        <div className="container mx-auto">
            <div className="flex gap-5">
                <div className="hidden xl:block flex-1 rounded-md border p-4 shadow-xs">
                    <h2 className="text-xl font-bold mb-5">Filter Tour</h2>

                    <div className="mb-5">
                        <h3 className="mb-2">By Division</h3>
                        <Select onValueChange={(value) => {
                            setSelectedDivision(value)
                        }}>
                            <SelectTrigger className='w-full' disabled={divisionLoading}>
                                <SelectValue placeholder="Select Tour Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {allDivisions.map((item: {
                                    value: string,
                                    label: string
                                }, index: number) => {
                                    return <SelectItem key={index} value={item?.value}>{item?.label}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-5">
                        <h3 className="mb-2">By Tour Type</h3>
                        <Select onValueChange={(value) => {
                            setSelectedTourType(value)
                        }}>
                            <SelectTrigger className='w-full' disabled={tourLoading}>
                                <SelectValue placeholder="Select Tour Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {allTourTypes.map((item: {
                                    value: string,
                                    label: string
                                }, index: number) => {
                                    return <SelectItem key={index} value={item?.value}>{item?.label}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex-3">
                    {tours && tours.map((tour: ITourType) => {
                        return <TourListItem key={tour._id} tour={tour} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tours
