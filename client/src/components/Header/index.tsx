import { NavLink } from "react-router-dom"
import { SINGIN_ROUTE } from "../../utils/const"

export function Header() {
  return (
    <div className="header d-flex justify-content-between p-3">
      <h1 className="header__logo">R2 tourism</h1>
      <nav className="header__nav d-flex gap-3 align-items-center">
        <NavLink className="header__link" to="/">Home</NavLink>
        <a className="header__link" href="#">About</a>
        <a className="header__link" href="#">Contact</a>
        <NavLink className="header__link" to={SINGIN_ROUTE}>Login</NavLink>
      </nav>
    </div>
  )
}
