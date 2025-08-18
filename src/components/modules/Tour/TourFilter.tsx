import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAllDivisionsQuery } from "@/redux/features/division/division.api"
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"


interface ITour {
    _id: string,
    name: string,
}
interface IDivision {
    _id: string,
    name: string,
}

const TourFilter = () => {

    const [selectedDivision, setSelectedDivision] = useState<string>("")
    const [selectedTourType, setSelectedTourType] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams()

    // Set url params on division change
    const handleDivisionChange = (value: string) => {
        setSelectedDivision(value)
        const params = new URLSearchParams(searchParams)
        params.set('division', value)
        setSearchParams(params)
    }

    // Set url params on tourType change
    const handleTourTypeChange = (value: string) => {
        setSelectedTourType(value)
        const params = new URLSearchParams(searchParams)
        params.set('tourType', value)
        setSearchParams(params)
    }

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

    // Clear filter
    const handleClearFilter = () => {
        setSearchParams(undefined)
        setSelectedDivision('')
        setSelectedTourType('')
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold ">Filter Tour</h2>
                <Button onClick={handleClearFilter} className="text-white dark:text-foreground cursor-pointer">Clear filter</Button>
            </div>

            <div className="mb-5">
                <h3 className="mb-2">By Division</h3>
                <Select value={selectedDivision} onValueChange={(value) => {
                    handleDivisionChange(value)
                }}>
                    <SelectTrigger className='w-full' disabled={divisionLoading}>
                        <SelectValue placeholder="Select Division" />
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
                <Select value={selectedTourType} onValueChange={(value) => {
                    handleTourTypeChange(value)
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
    )
}

export default TourFilter
