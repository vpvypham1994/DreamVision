"use client"
import { useEffect, useState } from 'react'
import { imageToSvg } from '../components/Utilities'
import Footer from './footer'
import Header from './header'
import Left from './left'
import Search from './search'


export default function Layout({ children, leftMenu }) {

    useEffect(() => {
        setTimeout(() => {
            imageToSvg()

        }, 2000);

        if (leftMenu) {
            document.querySelector('.techwave_fn_wrapper').classList.add("fn__has_sidebar")
        }
    }, [])


    const [leftmenu, setLeftmenu] = useState(false)
    const [mobileMenu, setMobiletmenu] = useState(false)
    const activeTrueFalse = () => {
        setLeftmenu(!leftmenu)
        document.querySelector('.toggleMenu').classList.toggle("panel-opened")
    }
    const activeMobileMenu = () => {
        setMobiletmenu(mobileMenu)
        document.querySelector('.toggleMenu').classList.toggle("mobile-panel-opened")
    }

    const [OpenSearch, setOpenSearch] = useState(false)
    const searchToggle = () => {
        setOpenSearch(!OpenSearch)
    }
    return (
        <>
            {/* Moving Submenu */}
            <div className="techwave_fn_fixedsub">
                <ul />
            </div>
            {/* !Moving Submenu */}
            {/* Preloader */}
            {/* <Loading/> */}
            {/* !Preloader */}
            {/* MAIN WRAPPER */}
            <div className="techwave_fn_wrapper">
                <div className="techwave_fn_wrap">
                    {/* Searchbar */}
                    <Search OpenSearch={OpenSearch} searchToggle={searchToggle} />
                    {/* !Searchbar */}
                    {/* HEADER */}
                    <Header searchToggle={searchToggle} />
                    {/* !HEADER */}
                    {/* LEFT PANEL */}
                    <Left activeTrueFalse={activeTrueFalse} activeMobileMenu={activeMobileMenu} />
                    {/* !LEFT PANEL */}
                    {/* CONTENT */}
                    <div className="techwave_fn_content">
                        {/* PAGE (all pages go inside this div) */}
                        <div className="techwave_fn_page" >
                            {children}
                        </div>
                        {/* !PAGE (all pages go inside this div) */}
                        {/* FOOTER (inside the content) */}
                        <Footer />
                        {/* !FOOTER (inside the content) */}
                    </div>
                    {/* !CONTENT */}
                </div>
            </div>
            {/* !MAIN WRAPPER */}
        </>
    )
}
