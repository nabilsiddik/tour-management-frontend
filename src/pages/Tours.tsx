import Loading from "@/components/Loading"
import TourListItem from "@/components/TourListItem"
import { useGetToursQuery } from "@/redux/features/tour/tour.api"
import type { ITourType } from "@/types"

const Tours = () => {

    const { data: tours, isLoading } = useGetToursQuery(undefined)

    if (isLoading) {
        return <div className="flex items-center justify-center">
            <Loading />
        </div>
    }

    return (
        <div className="container mx-auto">
            <div className="flex gap-5">
                <div className="hidden xl:block flex-1">
                    sidebar
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
