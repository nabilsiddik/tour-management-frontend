import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import z from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { useAddTourMutation, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useAllDivisionsQuery } from '@/redux/features/division/division.api';
import { cn } from '@/lib/utils';
import { format, formatISO } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import MultipleTourImageUploader from '../MultipleTourImageUploader';
import { useEffect, useState } from 'react';
import type { FileMetadata } from '@/hooks/use-file-upload';
import { toast } from 'sonner';

interface ITour {
    _id: string,
    name: string,
}
interface IDivision {
    _id: string,
    name: string,
}

export const AddTourForm = () => {
    const [addTour] = useAddTourMutation()

    // Multiple images states
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([])
    const [isUploaded, setIsUploaded] = useState<boolean>(false)

    const { data: tourTypes, isLoading: tourLoading } = useGetTourTypesQuery(undefined)
    const { data: divisions, isLoading: divisionLoading } = useAllDivisionsQuery(undefined)

    // useEffect(() => {
    //     if (images.length > 0) {
    //         setIsUploaded(true)
    //     } else {
    //         setIsUploaded(false)
    //     }
    // }, [images])

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
        costFrom: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        included: z.array(
            z.object({
                value: z.string()
            })
        ).optional(),
        excluded: z.array(
            z.object({
                value: z.string()
            })
        ).optional(),
        amenities: z.array(
            z.object({
                value: z.string()
            })
        ).optional(),
        tourPlan: z.array(
            z.object({
                value: z.string()
            })
        ).optional(),
        maxGuest: z.number().optional(),
        minAge: z.number().optional(),
        division: z.string(),
        tourType: z.string(),
        departureLocation: z.string(),
        arrivalLocation: z.string()
    })

    const form = useForm<z.infer<typeof tourSchema>>({
        defaultValues: {
            title: '',
            description: '',
            division: '',
            tourType: '',
            startDate: '',
            endDate: '',
            included: [{ value: "" }],
            excluded: [{ value: "" }],
            amenities: [{ value: "" }],
            tourPlan: [{ value: "" }],
            maxGuest: 50,
            minAge: 8,
            departureLocation: '',
            arrivalLocation: '',
            costFrom: 0
        }
    })

    // Use field array hook from react hook form for included field
    const { fields: includedFields, append: includedAppend, remove: includedRemove } = useFieldArray({
        control: form.control,
        name: 'included'
    })

    // Use field array hook from react hook form for excluded field
    const { fields: excludedFields, append: excludedAppend, remove: excludedRemove } = useFieldArray({
        control: form.control,
        name: 'excluded'
    })

    const {
        fields: amenitiesFields,
        append: appendAmenities,
        remove: removeAmenities,
    } = useFieldArray({
        control: form.control,
        name: "amenities",
    });

    const {
        fields: tourPlanFields,
        append: appendTourPlan,
        remove: removeTourPlan,
    } = useFieldArray({
        control: form.control,
        name: "tourPlan",
    });


    // Add tour
    const handleAddTour = async (data: z.infer<typeof tourSchema>) => {
        const toastId = toast.loading('Creating...')
        try {

            if (data.startDate > data.endDate) {
                throw new Error('End date can not be greater than start date.')
            }

            if (images.length === 0) {
                throw new Error('Tour Images are required')
            }

            const tourData = {
                ...data,
                startDate: formatISO(data.startDate, { representation: "date" }),
                endDate: formatISO(data.endDate, { representation: "date" }),
                included: data.included && data.included.map((item: { value: string }) => item.value),
                excluded: data.excluded && data.excluded.map((item: { value: string }) => item.value),
                amenities: data.amenities && data.amenities.map((item: { value: string }) => item.value),
                tourPlan: data.tourPlan && data.tourPlan.map(((item: { value: string }, index: number) => `Day ${index + 1}: ${item.value}`)),
                costFrom: Number(data.costFrom),
                maxGuest: Number(data.maxGuest),
                minAge: Number(data.minAge)
            }
            console.log(tourData)
            const formData = new FormData()
            formData.append('data', JSON.stringify(tourData))
            images.forEach((image) => formData.append('files', image as File))

            const res = await addTour(formData).unwrap()

            if (res.success) {
                toast.success('Tour Created.', { id: toastId })
            }

        } catch (error: any) {
            console.error(error)

            if (error instanceof (Error)) {
                toast.error(error?.message, { id: toastId })
            } else if (error?.data?.message) {
                toast.error(error?.data?.message, { id: toastId })
            }
        }

    }

    return (
        <div className='max-w-4xl mx-auto px-10 flex-1 rounded-lg py-10'>
            <h1 className='font-bold text-center text-3xl'>Add a Tour</h1>
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
                                            }, index: number) => {
                                                return <SelectItem key={index} value={item?.value}>{item?.label}</SelectItem>
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
                                            }, index: number) => {
                                                return <SelectItem key={index} value={item?.value}>{item?.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Max guest and Min age  */}
                    <div className='flex items-center gap-3'>
                        {/* Max guest */}
                        <FormField
                            control={form.control}
                            name="maxGuest"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Max Guest</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder='Max guest number' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Min age of guest */}
                        <FormField
                            control={form.control}
                            name="minAge"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Min Age</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder='Min Age of Guest' />
                                    </FormControl>
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


                    {/* departureLocation and arrivalLocation  */}
                    <div className='flex items-center gap-3'>
                        {/* departureLocation */}
                        <FormField
                            control={form.control}
                            name="departureLocation"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>From</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='text' placeholder='Departure Location' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* departureLocation */}
                        <FormField
                            control={form.control}
                            name="arrivalLocation"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>To</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='text' placeholder='Arrival Location' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* cost from  */}
                    <div>
                        <FormField
                            control={form.control}
                            name="costFrom"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Cost From</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder='Cost Starting from' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* tour description and multiple tour image uploader */}
                    <div className='flex gap-3 items-stretch flex-col lg:flex-row'>
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
                            <FormLabel className='mb-2'>Tour Images</FormLabel>
                            <MultipleTourImageUploader onChange={setImages} />
                        </div>
                    </div>

                    {/* devider  */}
                    <div className='border-t border-muted w-full my-10'></div>

                    {/* add included  */}
                    <div>
                        <div className='flex items-center justify-between'>
                            <span className='font-bold text-xl'>Add Includes</span>
                            <Button type="button" className='text-foreground cursor-pointer' onClick={() => includedAppend({ value: '' })}>Add Includes <Plus /> </Button>
                        </div>

                        <div className='mt-5'>
                            {includedFields.map((item, index) =>
                                <div className='mb-5 flex items-center gap-4' key={item.id}>
                                    <div className='flex-1 block'>
                                        <FormField
                                            control={form.control}
                                            name={`included.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Add Includes" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div onClick={() => includedRemove(index)} className='block cursor-pointer bg-red-500 p-1 rounded-sm'>
                                        <Trash2 />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* devider  */}
                    <div className='border-t border-muted w-full my-10'></div>

                    {/* add excluded  */}
                    <div>
                        <div className='flex items-center justify-between'>
                            <span className='font-bold text-xl'>Add Excludes</span>
                            <Button type="button" className='text-foreground cursor-pointer' onClick={() => excludedAppend({ value: '' })}>Add Excludes <Plus /> </Button>
                        </div>

                        <div className='mt-5'>
                            {excludedFields.map((item, index) =>
                                <div className='mb-5 flex items-center gap-4' key={item.id}>
                                    <div className='flex-1 block'>
                                        <FormField
                                            control={form.control}
                                            name={`excluded.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Add Excludes" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div onClick={() => excludedRemove(index)} className='block cursor-pointer bg-red-500 p-1 rounded-sm'>
                                        <Trash2 />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* devider  */}
                    <div className='border-t border-muted w-full my-10'></div>

                    {/* add amenities  */}
                    <div>
                        <div className='flex items-center justify-between'>
                            <span className='font-bold text-xl'>Add Amenities</span>
                            <Button type="button" className='text-foreground cursor-pointer' onClick={() => appendAmenities({ value: '' })}>Add Aminities <Plus /> </Button>
                        </div>

                        <div className="space-y-4 mt-4">
                            {amenitiesFields.map((item, index) => (
                                <div className="flex gap-2" key={item.id}>
                                    <FormField
                                        control={form.control}
                                        name={`amenities.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Add amenities" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div onClick={() => removeAmenities(index)} className='block cursor-pointer bg-red-500 p-1 rounded-sm'>
                                        <Trash2 />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* devider  */}
                    <div className='border-t border-muted w-full my-10'></div>

                    {/* add tour plan  */}
                    <div className='mb-10'>
                        <div className='flex items-center justify-between'>
                            <span className='font-bold text-xl'>Add Tour Plan</span>
                            <Button type="button" className='text-foreground cursor-pointer' onClick={() => appendTourPlan({ value: '' })}>Add Tour Plan <Plus /> </Button>
                        </div>

                        <div className="space-y-4 mt-4">
                            {tourPlanFields.map((item, index) => (
                                <div className="flex gap-2" key={item.id}>
                                    <FormField
                                        control={form.control}
                                        name={`tourPlan.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder={`Day ${index + 1}`} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div onClick={() => removeTourPlan(index)} className='block cursor-pointer bg-red-500 p-1 rounded-sm'>
                                        <Trash2 />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <Button className='text-foreground w-full' type="submit">Add Tour</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddTourForm
