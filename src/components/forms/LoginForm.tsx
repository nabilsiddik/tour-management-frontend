import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordField from "../PasswordField"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

// zod schema for user login 
const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
})

const LoginForm = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [login] = useLoginMutation()
    const navigate = useNavigate()

    // Handle User Login
    const handleUserLogin = async (data: z.infer<typeof loginSchema>) => {
        try {
            // New user info
            const userInfo = {
                email: data.email,
                password: data.password
            }
            const result = await login(userInfo).unwrap()

            if (result.success) {
                toast.success('User Successfully loged in.')
                navigate('/')
            }

        } catch (error: any) {
            console.error(error)

            if(error?.data?.message === 'password is not valid'){
                toast.error('Invalid credentials')
            }

            // Navigate to verify page is user is unauthorized
            if (error?.data?.message === 'User is not verified') {
                toast.error(error?.data?.message)
                navigate('/verify', {
                    state: data.email
                })
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUserLogin)}>
                {/* email field  */}
                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your verified email address
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* password field  */}
                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordField {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is secure password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-200 shadow-lg cursor-pointer" type="submit">Login</Button>
            </form>
        </Form>
    )
}

export default LoginForm
