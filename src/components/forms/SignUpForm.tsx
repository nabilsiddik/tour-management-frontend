import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordField from "../PasswordField"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

// zod schema for user registration 
const registerSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    password: z
        .string()
        .min(8, { message: "Password must be minimum 8 characters long." })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[\W_]/, "Password must contain at least one special character."),
    confirmPassword: z
        .string()
        .min(8, { message: "Password must be minimum 8 characters long." })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[\W_]/, "Password must contain at least one special character."),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match.',
    path: ['confirmPassword']
})

const SignUpForm = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const [register] = useRegisterMutation()

    // On submit form
    const onSubmit = async(data: z.infer<typeof registerSchema>) => {
        // New user info
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        try{
            const result = await register(userInfo).unwrap()
            console.log(result)
            toast.success('User Created Successfully.')
            
        }catch(error: any){
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* name field  */}
                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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
                                    <PasswordField {...field}/>
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is secure password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* confirm password field  */}
                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordField {...field}/>
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Confirm your password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-200 shadow-lg cursor-pointer" type="submit">Create Account</Button>
            </form>
        </Form>
    )
}

export default SignUpForm
