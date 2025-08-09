// import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const otpFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})


const VerificationPage = () => {
  const location = useLocation()
  console.log(location.state)
  // const navigate = useNavigate()
  // const [email] = useState(location.state)

  // useEffect(()=> {
  //   if(!email){
  //     navigate('/')
  //   }
  // }, [])

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      pin: ''
    }
  })


  // Handle OTP submission
  const otpSubmission = (data: z.infer<typeof otpFormSchema>) => {
    console.log(data)
  }

  return (
    <div className="container mx-auto w-lg">
      <h2 className="text-2xl text-center mb-5 mt-10">Verify Your OTP</h2>
      <Card>
        <CardContent>
          <div className="flex justify-center">
            <Form {...form}>
              <form id="otp-form" onSubmit={form.handleSubmit(otpSubmission)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-center block text-lg">Your One-Time Password</FormLabel>
                      <FormDescription className="text-center text-sm">
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <div className="flex justify-center">
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <Button form="otp-form" className="mx-auto block w-full cursor-pointer" type="submit">Verify OTP</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerificationPage
