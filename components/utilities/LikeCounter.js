'use client'
import React, { useState } from 'react';

function LikeCounter({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        if (liked) {
            setCount(count - 1);
        } else {
            setCount(count + 1);
        }
        setLiked(!liked);
    };

    return (
        <a className={`fn__like no_border ${liked ? "has__like" : ""}`} onClick={handleClick}>
            <span className="count">{count}</span>
            <img src="svg/like.svg" alt="" className="fn__svg empty__like" />
            <img src="svg/like-full.svg" alt="" className="fn__svg full__like" />
        </a>
    );
}

export default LikeCounter;
