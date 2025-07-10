import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HiMenu, HiX } from "react-icons/hi";
import { useContext } from 'react';
import { UserDetailsContainer } from '../context/UserDetailsContext';

function Header() {
    const navigate = useNavigate()
    const {searchValue,setSearchValue} = useContext(UserDetailsContainer)
    const [showSearch, setShowSearch] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const profile = () => {
        navigate("/profile")
        setMenuOpen(false)
    }
    const home = () => {
        navigate("/")
        setMenuOpen(false)
    }
    const popular = () => {
        navigate("/popular")
        setMenuOpen(false)
    }
    const search = () => {
        setShowSearch(true)
        navigate("/search");
        setMenuOpen(false)
    }
    const searchInput = (e) =>{
        setSearchValue(e.target.value)
    }

    return (
        <>
            <div className="flex justify-between items-center  text-white p-4 md:px-8">
                {/* Logo */}

                <h1 className='font-bold text-red-600 text-3xl'>MOVIES</h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 items-center">
                    <h2 className='cursor-pointer text-xl' onClick={home}>Home</h2>
                    <h2 className='cursor-pointer text-xl' onClick={popular}>Popular</h2>

                    <div className="flex items-center gap-2 hover:border-2">
                        {showSearch && (
                            <input
                                type="text"
                                className="rounded px-2 py-1 text-white"
                                value={searchValue}
                                onChange={searchInput}
                            />
                        )}
                        <img
                            src="https://res.cloudinary.com/deukqrxtt/image/upload/v1751686800/search_pa5wqo.png"
                            className="w-8 h-8 cursor-pointer"
                            alt="search"
                            onClick={search}
                        />
                    </div>

                    <img
                        src="https://res.cloudinary.com/deukqrxtt/image/upload/v1751686627/Avatar_1_qj1zqq.png"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="profile"
                        onClick={profile}
                    />
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <img
                        src="https://res.cloudinary.com/deukqrxtt/image/upload/v1751686627/Avatar_1_qj1zqq.png"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="profile"
                        onClick={profile}

                    />
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden  text-white px-4 py-4 space-y-4 flex flex-col jusity-end">
                    <h2 className='cursor-pointer text-xl' onClick={home}>Home</h2>
                    <h2 className='cursor-pointer text-xl' onClick={popular}>Popular</h2>
                    
                    <div className="flex items-center gap-2 hover:border-2">
                        {showSearch && (
                            <input
                                type="text"
                                className="rounded px-2 py-1 text-white"
                                value={searchValue}
                                onChange={searchInput}
                            />
                        )}
                        <img
                            src="https://res.cloudinary.com/deukqrxtt/image/upload/v1751686800/search_pa5wqo.png"
                            className="w-8 h-8 cursor-pointer"
                            alt="search"
                            onClick={search}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
