import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"

const PaymentSuccess = () => {

    const { transactionId } = useParams()

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <h1 className="text-green-600 text-center text-3xl font-bold">Payment Successfull</h1>
                    <p className="text-center mt-3">Your Payment for the tour booking successfully complted</p>
                    <p className="mt-3 text-center">Your transaction id is: {transactionId && transactionId}</p>
                    <Link className="flex justify-center" to='/tours'>
                        <Button size={'lg'} className="mt-3 text-white dark:text-foreground">Go To Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
