"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function Search({ OpenSearch, searchToggle }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setSearchText(inputText);
    }

    return (
        <>
            <div className={`techwave_fn_searchbar ${!OpenSearch ? "" : "opened"}`}>
                <div className="search__bar">
                    <input
                        className="search__input"
                        type="text"
                        placeholder="Search here..."
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <img src="svg/search.svg" alt="" className="fn__svg search__icon" />
                    <a onClick={searchToggle} className="search__closer" href="#"><img src="svg/close.svg" alt="" className="fn__svg" /></a>
                </div>
                <div className={`search__results ${searchText ? 'opened' : ''}`}>
                    {/* Results will come here (via ajax after the integration you made after purchase as it doesn't work in HTML) */}
                    <div className={`results__title ${searchText ? 'opened' : ''}`}>Results</div>
                    <div className="results__list">
                        <ul>
                            <li><Link href="#">Artificial Intelligence</Link></li>
                            <li><Link href="#">Learn about the impact of AI on the financial industry</Link></li>
                            <li><Link href="#">Delve into the realm of AI-driven manufacturing</Link></li>
                            <li><Link href="#">Understand the ethical implications surrounding AI</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

