// import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardFooter,
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
import { useState } from "react"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

const otpFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})


const VerificationPage = () => {
  const [confirmed, setConfirmed] = useState(false)
  const location = useLocation()
  console.log(location.state)
  const [email] = useState(location.state)
  const [sendOtp] = useSendOtpMutation()
  const [verifyOtp] = useVerifyOtpMutation()
  const navigate = useNavigate()

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
  const otpSubmission = async (data: z.infer<typeof otpFormSchema>) => {

    try {

      const res = await verifyOtp({
        otp: data.pin,
        email
      }).unwrap()

      if (res.success) {
        toast.success('Verification successfull.')
        navigate('/')
      }

    } catch (error: any) {
      console.error(error)
      if (!error?.data.success) {
        toast.error('Please enter the correct OTP')
      }
    }

  }

  // Handle confirm verification
  const handleConfirmVerification = async () => {
    const toastId = toast.loading('Loading...')

    try {
      const res = await sendOtp({ email }).unwrap()

      if (res.success) {
        toast.success('OTP successfully sent. Please check your email.', { id: toastId })
        setConfirmed(true)

      }
    } catch (error: any) {
      console.error(error)
      if (!error?.data?.success) {
        toast.error(error?.data?.message)
      }
    }
  }

  return (
    <div className="container mx-auto w-lg">
      <h2 className="text-2xl text-center mb-5 mt-10">OTP Verification</h2>
      {confirmed ?
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

        :

        <Card>
          <CardContent>
            <div className="text-center">
              <h3 className="mb-2 text-lg">Verify Your Email Address</h3>
              <p className="text-sm">We will sent you an OTP at {email}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConfirmVerification} className="mx-auto block w-full cursor-pointer" type="submit">Confirm</Button>
          </CardFooter>
        </Card>

      }
    </div>
  )
}

export default VerificationPage
