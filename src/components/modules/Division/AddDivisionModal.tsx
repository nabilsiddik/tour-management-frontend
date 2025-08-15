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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"
import SingleImageUploader from "@/components/SingleImiageUploader"
import { useState } from "react"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"

export function AddDivisionModal() {

  const [addDivision] = useAddDivisionMutation()
  const [divisionImage, setDivisionImage] = useState<File | null>(null)

  // Tour type zod schema
  const divisionSchema = z.object({
    name: z.string()
  })

  // React hook form
  const form = useForm<z.infer<typeof divisionSchema>>(({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: ''
    }
  }))

  // Add tour type
  const handleAddDivision = async (data: z.infer<typeof divisionSchema>) => {
    console.log(data)
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))
    formData.append('file', divisionImage as File)
    const toastId = toast.loading('Creating...')
    try {
      const res = await addDivision(formData).unwrap()

      if (res.success) {
        toast.success("Division Added added.", { id: toastId })
        form.reset()
        setDivisionImage(null)
      }

    } catch (error: any) {
      console.error(error)
      toast.error(`Division creation failed. ${error?.data?.message}`, { id: toastId })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant="outline">Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(handleAddDivision)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Write a division name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is division
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <FormLabel className="mb-2">Division Featured Image</FormLabel>
              <SingleImageUploader onChange={setDivisionImage} />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="text-foreground" form="add-tour-type" type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
