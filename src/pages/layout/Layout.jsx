import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {

    return (
        <>
            <div className='nav-bar'>
                <h1>Dashboard</h1>
            </div>
            <div className='container'>
                <div className="left-con">
                    <button className='button'><Link to={"/product"} className='a'>Product</Link></button>
                    <button className='button'><Link to={"/hero"} className='a'>Hero</Link></button>
                </div>
                <div className="right-con">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default Layout
