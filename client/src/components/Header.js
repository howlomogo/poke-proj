import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/header-logo.svg'

function Header() {
  return (
    <div className="bg-red-600 pt-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <Link to="/" className="m-6 text-white">Home</Link>
          <Logo />
          <Link to="/list" className="m-6 text-white">List</Link>
        </div>
      </div>
    </div>
  )
}

export default Header