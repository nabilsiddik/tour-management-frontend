import { Link } from 'react-router-dom'
import dummyImage from '../assets/images/dummy-image.png'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { IconMoneybag } from '@tabler/icons-react'
import { CarIcon, User } from 'lucide-react'

const TourListItem = ({ tour }: any) => {
    return (
        <div className='flex items-center gap-7 flex-col md:flex-row px-5 mb-10'>
            <div className='flex-2'>
                {tour && <img className='w-full rounded-md' src={tour.images.length > 0 ? tour.images[1] : dummyImage} alt="" />}
            </div>

            <div className='flex flex-col gap-4 flex-2'>
                {/* title and description  */}
                <div className='mb-2'>
                    <h2 className="font-bold text-2xl lg:text-3xl text-foreground">{tour.title}</h2>
                    <p className='mt-2'>{tour.description}</p>
                </div>

                {/* price and max guest  */}
                <div className='flex gap-3 sm:gap-2 flex-2 justify-between flex-col sm:flex-row'>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>
                            <IconMoneybag size={20} />
                        </span>
                        <span>From BDT {tour.costFrom}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>
                            <User size={20} />
                        </span>
                        <span>Max Guest {tour.maxGuest}</span>
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <div> <User size={20} /> </div>
                        <div>Min Age {tour.minAge}</div>
                    </div>
                </div>

                {/* from to  */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>
                            <CarIcon />
                        </span>
                        <span>From {tour.departureLocation}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>
                            <CarIcon />
                        </span>
                        <span>To {tour.arrivalLocation}</span>
                    </div>
                    
                    <div></div>
                </div>

                <div className='mb-3'>
                    {/* Amenities  */}
                    <div className='flex items-center gap-1'>
                        {tour?.amenities.slice(0, 3).map((item: string[], index: number) =>
                            <div key={index}>
                                <Badge variant='outline'>
                                    {item}
                                </Badge>
                            </div>
                        )}

                        {(tour?.amenities && tour?.amenities.length > 3) &&
                            <Badge variant='outline'>
                                {`+${tour?.amenities.length - 3} More`}
                            </Badge>
                        }
                    </div>
                </div>

                <div className='w-full'>
                    <Link to={`/tour/${tour._id}`}>
                        <Button size={'lg'} className='dark:text-foreground w-full'>View Details</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TourListItem
