import Loading from "@/components/Loading"
import { useGetToursQuery } from "@/redux/features/tour/tour.api"
import { useParams } from "react-router-dom"

const TourDetails = () => {

    const {id} = useParams()
    const {data, isLoading} = useGetToursQuery({_id: id})

    if(isLoading){
        return <Loading/>
    }

    const tourData = data?.[0]

  return (
    <div>
      <div className="container mx-auto">
        {tourData?.title}
      </div>
    </div>
  )
}

export default TourDetails
