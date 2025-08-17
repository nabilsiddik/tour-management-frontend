import Devider from "@/components/Devider"
import Loading from "@/components/Loading"
import { useGetToursQuery } from "@/redux/features/tour/tour.api"
import { CarIcon } from "lucide-react"
import { useParams } from "react-router-dom"

const TourDetails = () => {

    const { id } = useParams()
    const { data, isLoading } = useGetToursQuery({ _id: id })

    if (isLoading) {
        return <Loading />
    }

    const tourData = data?.[0]

    const CheckIcon = () => (
        <svg
            width={20}
            height={20}
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="check"
        >
            <path
                d="M0,0v775.711V1200h424.289H1200V752.556V424.289l-196.875,196.875v381.961H621.164H196.875V578.836V196.875h381.961L775.711,0H0z M1030.008,15.161
	l-434.18,434.25L440.7,294.283L281.618,453.438L595.821,767.57l159.082-159.082l434.18-434.25L1030.001,15.157L1030.008,15.161z"
                fill={'currentColor'}
            />
        </svg>
    )

    return (
        <div>
            <div className="container mx-auto px-5">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                    {tourData?.images.map((image: string, index: number) => {
                        return <div className="max-h-[300px] min-h-[150px] md:min-h-[200px] lg:min-h-[300px]" key={index} style={{
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        </div>
                    })}
                </div>
                <div className="flex gap-10 flex-col lg:flex-row">
                    <div className="flex-3">
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-3">{tourData?.title}</h1>
                            <div className="flex items-center gap-5">
                                <span className="flex items-center gap-3">
                                    <span><CarIcon /></span>
                                    <span>From {tourData?.departureLocation}</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <span><CarIcon /></span>
                                    <span>To {tourData?.arrivalLocation}</span>
                                </span>
                            </div>
                        </div>

                        <Devider />

                        {/* about tour  */}
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-3">About this tour</h1>
                            <p className="mt-5">{tourData?.description}</p>
                        </div>

                        <Devider />

                        {/* Includeds in this tour  */}
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-5">Includeds</h1>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {tourData?.included.map((item: string, index: number) => {
                                    return <div key={index} className="flex items-center gap-2 mb-3">
                                        <span><CheckIcon/></span>
                                        <span className="text-lg">{item}</span>
                                    </div>
                                })}
                            </div>
                        </div>

                        <Devider />

                        {/* Excludeds in this tour  */}
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-5">Excludeds</h1>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {tourData?.excluded.map((item: string, index: number) => {
                                    return <div key={index} className="flex items-center gap-2 mb-3">
                                        <span><CheckIcon/></span>
                                        <span className="text-lg">{item}</span>
                                    </div>
                                })}
                            </div>
                        </div>

                        <Devider />

                        {/* Amenities in this tour  */}
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-5">Amenities</h1>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {tourData?.amenities.map((item: string, index: number) => {
                                    return <div key={index} className="flex items-center gap-2 mb-3">
                                        <span><CheckIcon/></span>
                                        <span className="text-lg">{item}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1>sidebar</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetails
