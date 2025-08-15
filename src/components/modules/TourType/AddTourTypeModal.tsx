import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"

export function AddTourTypeModal() {

  const [addTourType] = useAddTourTypeMutation()

  // Tour type zod schema
  const tourTypeSchema = z.object({
    name: z.string()
  })

  // React hook form
  const form = useForm<z.infer<typeof tourTypeSchema>>(({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: ''
    }
  }))

  // Add tour type
  const handleAddTourType = async(data: z.infer<typeof tourTypeSchema>) => {
    try{
      const res = await addTourType({name: data.name}).unwrap()

      if(res.success){
        toast.success("Tour Type added.")
        form.reset()
      }

    }catch(error: any){
      console.error(error)
      toast.error(error?.data?.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Tour Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">Add Tour Type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(handleAddTourType)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Write a type" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is tour type
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="text-foreground" form="add-tour-type" type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
