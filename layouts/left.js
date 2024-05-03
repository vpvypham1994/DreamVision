"use client"
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';


const data = [
    {
        title: "Home",
        pathname: "/",
        img: "svg/home.svg"

    },
    {
        title: "Image to 3D",
        pathname: "/image-generation",
        img: "svg/image.svg"

    },
    {
        title: "Text to 3D",
        pathname: "/ai-chat-bot",
        img: "svg/chat.svg"

    },

];



export default function Left({ activeTrueFalse, activeMobileMenu }) {
    const pathname = usePathname()

    const [isToggle, setToggle] = useState(false)
    const toggleHandle = () => setToggle(!isToggle);

    return (
        <>
            <div className="techwave_fn_leftpanel">
                <div className="mobile_extra_closer" />
                {/* logo (left panel) */}
                <div className="leftpanel_logo">
                    <Link href="/" className="fn_logo">
                        <span className="full_logo">
                            <img src="img/logo-desktop-full.png" alt="" className="desktop_logo" />
                            <img src="img/logo-retina-full.png" alt="" className="retina_logo" />
                        </span>
                        <span className="short_logo">
                            <img src="img/logo-desktop-mini.png" alt="" className="desktop_logo" />
                            <img src="img/logo-retina-mini.png" alt="" className="retina_logo" />
                        </span>
                    </Link>
                    <a className="fn__closer fn__icon_button desktop_closer" onClick={activeTrueFalse}>
                        <img src="svg/arrow.svg" alt="" className="fn__svg" />
                    </a>
                    <a className="fn__closer fn__icon_button mobile_closer" onClick={activeMobileMenu}>
                        <img src="svg/arrow.svg" alt="" className="fn__svg" />
                    </a>
                </div>
                {/* !logo (left panel) */}
                {/* content (left panel) */}
                <div className="leftpanel_content">
                    {/* #1 navigation group */}
                    <div className="nav_group">
                        <h2 className="group__title">Start Here</h2>
                        <ul className="group__list">
                            {data.slice(0, 1).map((item, i) => (
                                <li key={i}>
                                    <Link href={`${item.pathname}`} className={`fn__tooltip menu__item ${item.pathname === pathname ? "active" : ""}`} title={item.title} >
                                        <span className="icon">
                                            <img src={item.img} alt="" className="fn__svg" />
                                        </span>
                                        <span className="text">{item.title}{item.counter && <span className="count">{item.counter}</span>}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* !#1 navigation group */}
                    {/* #2 navigation group */}
                    <div className="nav_group">
                        <h2 className="group__title">User Tools</h2>
                        <ul className="group__list">
                            {data.slice(1, 3).map((item, i) => (
                                <li key={i}>
                                    <Link href={`${item.pathname}`} className={`fn__tooltip menu__item ${item.pathname === pathname ? "active" : ""}`} title={item.title} >
                                        <span className="icon">
                                            <img src={item.img} alt="" className="fn__svg" />
                                        </span>
                                        <span className="text">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* !#2 navigation group */}
                </div>
                {/* !content (left panel) */}
            </div>
        </>
    )
}
