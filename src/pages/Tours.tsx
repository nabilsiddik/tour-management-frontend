import TourFilter from "@/components/modules/Tour/TourFilter"
import TourListItem from "@/components/TourListItem"
import { useGetToursQuery } from "@/redux/features/tour/tour.api"
import type { ITourType } from "@/types"
import { useSearchParams } from "react-router-dom"

const Tours = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    // Get params from the searchparams
    const selectedDivision = searchParams.get('division') || undefined
    const selectedTourType = searchParams.get('tourType') || undefined

    const { data: tours } = useGetToursQuery({ division: selectedDivision, tourType: selectedTourType })


    return (
        <div className="container mx-auto">
            <div className="flex gap-5">
                <div className="hidden xl:block flex-1 rounded-md border p-4 shadow-xs">
                    <div>
                        <TourFilter />
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
