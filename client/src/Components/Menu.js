import { NavLink } from "react-router-dom";

const Menu=(props)=>{


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink className="navbar-brand" to="/">Navbar</NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
                
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                  </li>
                  <li className="nav-item active">
                    {localStorage.getItem('auth')?(<NavLink className="nav-link" to="/logout">LogOut</NavLink>):(<NavLink className="nav-link" to="/signin">SingIn</NavLink>)}
                  </li>
                </ul>
              </div>
            </nav>
            
        </>
    )
}

export default Menu;