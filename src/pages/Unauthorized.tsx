import { Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div>
      <h1>Your are unauthorized</h1>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default Unauthorized
