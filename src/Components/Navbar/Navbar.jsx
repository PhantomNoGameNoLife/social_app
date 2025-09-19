import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
    const { token, logout: contextLogout } = useContext(AuthContext)

    const Navigate = useNavigate()

    function logout() {
        contextLogout()
        Navigate('/login')
    }

    return (
        <>
            <nav className="navbar px-16 py-4 bg-base-100 shadow-sm shadow-blue-600 dark:shadow-slate-50/20">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost text-2xl font-bold text-blue-600 dark:text-slate-50">Rawi-San</Link>
                </div>
                {token ? <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                </div> : <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                    </ul>
                </div>}
            </nav>
        </>
    )
}

export default Navbar
