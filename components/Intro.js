'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animationText } from './Utilities'
import { startMarquee } from './Marquee'

export default function Intro() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        if (marqueeElement) {
            startMarquee(marqueeElement);
        }
        animationText();

        // Dynamically import the Spline viewer script as a module
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
        script.type = "module";
        document.head.appendChild(script);

        return () => {
            // Cleanup the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="techwave_fn_intro">
                <div className="fn__center_title" id="demos">
                    <div className="lines">
                        <span className="l" />
                        <span className="c" />
                        <span className="r" />
                    </div>
                    <div className="text">
                        <h3 className="big fn__animated_text">DreamVision</h3>
                        <p>Generate high-quality 3D models, automatically, from images.</p>
                        <Link href="/home"><button className="button-23" role="button">Try It </button></Link>
                        <button className="button-23" role="button">Sign Up   </button>

                    </div>
                </div>
                <div className="templates">
               
                            <div  className="spline">
                            <spline-viewer url="https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode"></spline-viewer>
                          </div>
            
                </div>
            </div>
        </>
    )
}
