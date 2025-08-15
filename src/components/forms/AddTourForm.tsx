import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useAllDivisionsQuery } from '@/redux/features/division/division.api';
import { cn } from '@/lib/utils';
import { format, formatISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import MultipleTourImageUploader from '../MultipleTourImageUploader';
import { useState } from 'react';
import type { FileMetadata } from '@/hooks/use-file-upload';

interface ITour {
    _id: string,
    name: string,
}
interface IDivision {
    _id: string,
    name: string,
}

export const AddTourForm = () => {

    // Multiple images states
    const [images, setImages] = useState < (File | FileMetadata)[] | [] > ([])

    console.log(images)

    const { data: tourTypes, isLoading: tourLoading } = useGetTourTypesQuery(undefined)
    const { data: divisions, isLoading: divisionLoading } = useAllDivisionsQuery(undefined)

    // all tour types
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


    const tourSchema = z.object({
        title: z.string(),
        description: z.string().optional(),
        location: z.string().optional(),
        costFrom: z.number().optional(),
        startDate: z.string(),
        endDate: z.string(),
        included: z.array(z.string()).optional(),
        excluded: z.array(z.string()).optional(),
        amenities: z.array(z.string()).optional(),
        tourPlan: z.array(z.string()).optional(),
        maxGuest: z.number().optional(),
        minAge: z.number().optional(),
        division: z.string(),
        tourType: z.string(),
        departureLocation: z.string().optional(),
        arivalLocation: z.string().optional()
    })

    const form = useForm<z.infer<typeof tourSchema>>({
        defaultValues: {
            title: '',
            description: ''
        }
    })

    // Add tour
    const handleAddTour = (data: z.infer<typeof tourSchema>) => {
        const tourData = {
            ...data,
            startDate: formatISO(data.startDate),
            endDate: formatISO(data.endDate)
        }

        console.log(tourData)
    }

    return (
        <div className='max-w-4xl mx-auto px-10 flex-1'>
            <h1 className='font-bold text-center my-10 text-3xl'>Add a Tour</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddTour)} className="space-y-8">
                    {/* tour title  */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tour Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter tour title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex items-center gap-3'>
                        {/* select tour type */}
                        <FormField
                            control={form.control}
                            name="tourType"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Tour Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='w-full' disabled={tourLoading}>
                                                <SelectValue placeholder="Select Tour Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allTourTypes.map((item: {
                                                value: string,
                                                label: string
                                            }) => {
                                                return <SelectItem value={item?.value}>{item?.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* select tour division */}
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Division</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl >
                                            <SelectTrigger disabled={divisionLoading} className='w-full'>
                                                <SelectValue placeholder="Select Division" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allDivisions?.map((item: {
                                                value: string,
                                                label: string
                                            }) => {
                                                return <SelectItem value={item?.value}>{item?.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* start and end date of tour  */}
                    <div className='flex items-center gap-3'>
                        {/* tour start date  */}
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick Start Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* tour end date  */}
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick End Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* tour description and multiple tour image uploader */}
                    <div className='flex gap-3 items-start flex-col lg:flex-row'>
                        {/* tour description  */}
                        <div className='w-full lg:w-1/2'>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Description</FormLabel>
                                        <FormControl>
                                            <Textarea className='w-full' {...field} placeholder="Type Tour Description..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Multiple tour image upload  */}
                        <div className='w-full lg:w-1/2'>
                            <MultipleTourImageUploader onChange={setImages} />
                        </div>
                    </div>

                    <Button className='text-foreground w-full' type="submit">Add Tour</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddTourForm
