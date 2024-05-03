'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import LikeCounter from './utilities/LikeCounter'

const feeds = [
    {
        img: "img/gallery/1.jpg",
        authorPic: "img/gallery/2.jpg",
        authorName: "LuckyLee",
        count: 345
    },
  {
        img: "img/gallery/2.jpg",
        authorPic: "img/gallery/2.jpg",
        authorName: "LuckyLee",
        count: 211
    }
]

export default function TestCommunityFeed() {
    const [Lightbox, setLightbox] = useState(false);
    const [Value, setValue] = useState(false);
    const [likeCount, setLikeCount] = useState(0); // Common like count state

    const activeValue = (index) => {
        setLightbox(!Lightbox);
        setValue(feeds[index]);
    }

    const handleLikeClick = (countChange) => {
        setLikeCount(likeCount + countChange);
    }
    return (
        <>
            <>
            <div>
                <ul className="fn__gallery_items">
                    {/* #1 gallery item */}
                    {feeds.map((feed, i) => (
                        <li className="fn__gallery_item" key={i}>
                            {/* ... (other content) */}
                            <LikeCounter count={feed.count} onClick={() => handleLikeClick(feed.countChange)} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`techwave_fn_img_lightbox ${Lightbox ? "opened" : ""}`}>
                {/* ... (lightbox content) */}
                <LikeCounter count={likeCount} onClick={() => handleLikeClick(1)} />
            </div>
        </>
        </>
    )
}