'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { animationText } from '@/components/Utilities'

export default function Index() {
  useEffect(() => {
    animationText()

    console.log(animationText);
  }, [])

  return (
    <>
      <div className="techwave_fn_home">
          <div className="section_left">
            {/* Title Shortcode */}
            <div className="techwave_fn_title_holder">
              <h1 className="title">Unleash Your Creativity with AI</h1>
              <p className="desc">Generate your ideas into stunning visuals 3D model</p>
            </div>
            {/* !Title Shortcode */}
            {/* Interactive List Shortcode */}
            <div className="techwave_fn_interactive_list">
              <ul>
               
                <li>
                  <div className="item">
                    <Link href="/ai-chat-bot">
                      <span className="icon">
                        <img src="svg/chat.svg" alt="" className="fn__svg" />
                      </span>
                      <h2 className="title">Text-To-3D</h2>
                      <p className="desc">Generate a 3D model from text description. </p>
                      <span className="arrow"><img src="svg/arrow.svg" alt="" className="fn__svg" /></span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <Link href="/image-generation">
                      <span className="icon">
                        <img src="svg/image.svg" alt="" className="fn__svg" />
                      </span>
                      <h2 className="title">Image-To-3D</h2>
                      <p className="desc">Generate a 3D model from an image.</p>
                      <span className="arrow"><img src="svg/arrow.svg" alt="" className="fn__svg" /></span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* !Interactive List Shortcode */}
          </div>
        
      </div>
    </>
  )
}