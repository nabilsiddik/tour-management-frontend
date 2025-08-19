import Devider from "@/components/Devider"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api"
import { useAllDivisionsQuery } from "@/redux/features/division/division.api"
import { useGetToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { IconMoneybag } from "@tabler/icons-react"
import { format } from "date-fns"
import { CarIcon } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { FaLocationDot } from "react-icons/fa6";

const TourDetails = () => {

    const { id } = useParams()
    const { data, isLoading, isError } = useGetToursQuery({ _id: id })
    const { data: divisionData } = useAllDivisionsQuery({_id: data?.[0]?.division, fields: 'name'}, {skip: !data})
    const {data: tourTypeData} = useGetTourTypesQuery({_id: data?.[0].tourType})

    const [guestCount, setGuestCount] = useState<number>(1)
    const [createBooking] = useCreateBookingMutation()

    if (isLoading) {
        return <div className="container mx-auto flex items-center justify-center">
            <Loading />
        </div>
    }

    if (!isLoading && isError) {
        return <div className="container mx-auto">
            Something went wrong
        </div>
    }

    if (!isLoading && data?.length === 0) {
        return <div className="container mx-auto">
            No data found
        </div>
    }

    const tourData = data?.[0]

    // Increment guest count 
    const handleIncrementGuestCount = () => {
        setGuestCount(prev => prev + 1)
    }

    // Increment guest count 
    const handleDecrementGuestCount = () => {
        setGuestCount(prev => prev - 1)
    }

    const handleTourBooking = async (tourId: string) => {
        const bookingData = {
            tour: tourId,
            guestCount
        }
        const bookingId = toast.loading('Booking...')

        try {
            const res = await createBooking(bookingData).unwrap()
            console.log(res)

            if (res.success) {
                toast.success('You have successfully booked this tour.', { id: bookingId })
            }

        } catch (error: any) {
            console.error('Error while booking tour.', error)
            toast.error(error?.data?.message, { id: bookingId })
        }

    }



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
                    <div className="flex-4">
                        <div>
                            <h1 className="font-bold text-foreground lg:text-4xl md:text-3xl text-2xl mb-3">{tourData?.title}</h1>
                            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
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

                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <FaLocationDot />
                                        {divisionData?.data?.[0]?.name}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaLocationDot /> {tourTypeData?.data?.[0].name}
                                    </span>
                                </div>
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
                                        <span><CheckIcon /></span>
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
                                        <span><CheckIcon /></span>
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
                                        <span><CheckIcon /></span>
                                        <span className="text-lg">{item}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex-2">
                        <div className=" rounded-md border p-4 shadow-xs py-5">
                            <h2 className="mb-5 font-bold text-2xl ">Booking Details</h2>
                            <div className="mb-5 flex items-center justify-between">
                                <p className="text-foreground flex items-center gap-2"><IconMoneybag /> From <span className="font-bold">BDT {tourData?.costFrom}</span></p>

                            </div>

                            {/* start and end date  */}
                            <div className="mb-5 border rounded-lg">
                                <div className="flex items-center justify-between py-5 px-3 lg:px-2 xl:px-5">
                                    <div>
                                        <p className="font-bold">Start Date</p>
                                        <p>{format(new Date(tourData?.startDate ? tourData?.startDate : new Date()), 'PP')}</p>
                                    </div>
                                    <div>
                                        <span>-</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">End Date</p>
                                        <p>{format(new Date(tourData?.endDate ? tourData?.endDate : new Date()), 'PP')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>

                            {/* max guest and min age  */}
                            <div className="mb-5 border rounded-lg">
                                <div className="flex items-center justify-between py-5 px-3 lg:px-2 xl:px-5">
                                    <div>
                                        <p className="font-bold">Max Guest</p>
                                        <p>{tourData?.maxGuest}</p>
                                    </div>
                                    <div>
                                        <span>-</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">Min Age</p>
                                        <p>{tourData?.minAge}</p>
                                    </div>
                                </div>
                                <div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>

                            <div className="mb-5 border rounded-lg  py-5 px-3 lg:px-2 xl:px-5">
                                <p className="font-bold mb-2">Number of Guest</p>
                                <div className="flex items-center gap-3">
                                    <Button disabled={guestCount < 2} onClick={handleDecrementGuestCount} className="font-bold text-white dark:text-white">-</Button>
                                    <div>
                                        <input onChange={(e) => {
                                            setGuestCount(Number(e.target.value))
                                        }} type="number" value={guestCount} />
                                    </div>
                                    <Button disabled={guestCount >= tourData!.maxGuest} onClick={handleIncrementGuestCount} className="font-bold text-white dark:text-white">+</Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 mb-2">
                                <span>Cost per person:</span>
                                <span>BDT {tourData!.costFrom}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <span>Total Guest:</span>
                                <span>{guestCount}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <span>Total Cost:</span>
                                <span>BDT {guestCount * tourData!.costFrom}</span>
                            </div>

                            <Button onClick={() => {
                                handleTourBooking(tourData!?._id)
                            }} disabled={guestCount < 1 || guestCount >= tourData!.maxGuest} className="w-full text-white dark:text-foreground cursor-pointerm mt-10 cursor-pointer" size={'lg'}>Book Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetails
