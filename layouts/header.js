'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import screenfull from 'screenfull';

export default function Header({ searchToggle }) {
    // Light/Dark switcher
    const [skin, setSkin] = useState('dark');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Check if running in the browser (client side)
        if (typeof window !== 'undefined') {
            const storedSkin = localStorage.getItem('frenify_skin');
            if (storedSkin) {
                setSkin(storedSkin);
            }
        }
    }, []);

    const toggleSkin = () => {
        const newSkin = skin === 'light' ? 'dark' : 'light';
        setSkin(newSkin);
    };


    useEffect(() => {
        // Check if running in the browser (client side)
        if (typeof window !== 'undefined') {
            // Update local storage and document attribute
            localStorage.setItem('frenify_skin', skin);
            document.documentElement.setAttribute('data-techwave-skin', skin);
        }
    }, [skin]);


    // Full Screen Handler
    const toggleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(screenfull.isFullscreen);
    };

    useEffect(() => {
        // Fullscreen handlers
        if (screenfull.isEnabled) {
            screenfull.on('change', handleFullscreenChange);
        }

        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', handleFullscreenChange);
            }
        };
    }, []);

    return (
        <>
            <header className="techwave_fn_header">
               
            </header>
        </>
    )
}
