import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const VerificationPage = () => {
  const location = useLocation()
  console.log(location.state)
  const navigate = useNavigate()
  const [email] = useState(location.state)

  useEffect(()=> {
    if(!email){
      navigate('/')
    }
  }, [])

  return (
    <div>
      verify
    </div>
  )
}

export default VerificationPage
