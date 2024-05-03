"use client"
import React from 'react'
import Search from './search'
import Header from './header-2'
import Left from './left'
import Footer from './footer'
import { useEffect, useState } from 'react'
import { imageToSvg } from '../components/Utilities'


export default function Layout({ children, leftMenu }) {
    
  useEffect(() => {
    localStorage.setItem('frenify_skin', 'light'); 
  }, [])
  

    useEffect(() => {
        setTimeout(() => {
            imageToSvg()        
            
        }, 2000);

        if (leftMenu) {
            document.querySelector('.techwave_fn_wrapper').classList.add("fn__has_sidebar")
        }
    }, [])


    const [leftmenu, setLeftmenu] = useState(false)
    const activeTrueFalse = () => {
        setLeftmenu(!leftmenu)
        document.querySelector('.toggleMenu').classList.toggle("panel-opened")
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
                    <Left activeTrueFalse={activeTrueFalse} />
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
