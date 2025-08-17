import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const PaymentFailed = () => {
  return (
    <div className="container mx-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <h1 className="text-red-600 text-center text-3xl font-bold">Payment Failed</h1>
                    <p className="text-center mt-3">Sorry, Your Payment for the tour booking is failed.</p>
                    <Link className="flex justify-center" to='/tours'>
                        <Button size={'lg'} className="mt-3 text-white dark:text-foreground">Go To Home</Button>
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default PaymentFailed
