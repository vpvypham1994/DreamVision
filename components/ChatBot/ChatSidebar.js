import React from 'react';
import ChatSidebarItem from './ChatSidebarItem';
import Link from 'next/link';

const ChatSidebar = ({ messages }) => {
    return (
        <>
            <div className="chat__sidebar">
                <div className="sidebar_header">
                    <Link href="#chat0" className="fn__new_chat_link">
                        <span className="icon" />
                        <span className="text">New Chat</span>
                    </Link>
                </div>
                <div className="sidebar_content">
                    <div className="chat__group new">
                        <h2 className="group__title">Today</h2>
                        <ChatSidebarItem />
                        {/* ... */}
                    </div>
                </div>
            </div>



            {/* <div className="chat__sidebar">
                <div className="sidebar_header">
                    <Link href="#chat0" className="fn__new_chat_link">
                        <span className="icon" />
                        <span className="text">New Chat</span>
                    </Link>
                </div>
                <div className="sidebar_content">
                    <div className="chat__group new">
                        <h2 className="group__title">Today</h2>
                        <ul className="group__list">
                            <li className="group__item">
                                <div className="fn__chat_link active" href="#chat1">
                                    <span className="text">Chat Bot Definition</span>
                                    <input type="text" defaultValue="Chat Bot Definition" />
                                    <span className="options">
                                        <button className="trigger"><span /></button>
                                        <span className="options__popup">
                                            <span className="options__list">
                                                <button className="edit">Edit</button>
                                                <button className="delete">Delete</button>
                                            </span>
                                        </span>
                                    </span>
                                    <span className="save_options">
                                        <button className="save">
                                            <img src="svg/check.svg" alt="" className="fn__svg" />
                                        </button>
                                        <button className="cancel">
                                            <img src="svg/close.svg" alt="" className="fn__svg" />
                                        </button>
                                    </span>
                                </div>
                            </li>
                            <li className="group__item">
                                <div className="fn__chat_link" href="#chat2">
                                    <span className="text">Essay: Marketing</span>
                                    <input type="text" defaultValue="Essay: Marketing" />
                                    <span className="options">
                                        <button className="trigger"><span /></button>
                                        <span className="options__popup">
                                            <span className="options__list">
                                                <button className="edit">Edit</button>
                                                <button className="delete">Delete</button>
                                            </span>
                                        </span>
                                    </span>
                                    <span className="save_options">
                                        <button className="save">
                                            <img src="svg/check.svg" alt="" className="fn__svg" />
                                        </button>
                                        <button className="cancel">
                                            <img src="svg/close.svg" alt="" className="fn__svg" />
                                        </button>
                                    </span>
                                </div>
                            </li>
                            <li className="group__item">
                                <div className="fn__chat_link" href="#chat3">
                                    <span className="text">Future of Social Media</span>
                                    <input type="text" defaultValue="Future of Social Media" />
                                    <span className="options">
                                        <button className="trigger"><span /></button>
                                        <span className="options__popup">
                                            <span className="options__list">
                                                <button className="edit">Edit</button>
                                                <button className="delete">Delete</button>
                                            </span>
                                        </span>
                                    </span>
                                    <span className="save_options">
                                        <button className="save">
                                            <img src="svg/check.svg" alt="" className="fn__svg" />
                                        </button>
                                        <button className="cancel">
                                            <img src="svg/close.svg" alt="" className="fn__svg" />
                                        </button>
                                    </span>
                                </div>
                            </li>
                            <li className="group__item">
                                <div className="fn__chat_link" href="#chat4">
                                    <span className="text">Business Ideas</span>
                                    <input type="text" defaultValue="Business Ideas" />
                                    <span className="options">
                                        <button className="trigger"><span /></button>
                                        <span className="options__popup">
                                            <span className="options__list">
                                                <button className="edit">Edit</button>
                                                <button className="delete">Delete</button>
                                            </span>
                                        </span>
                                    </span>
                                    <span className="save_options">
                                        <button className="save">
                                            <img src="svg/check.svg" alt="" className="fn__svg" />
                                        </button>
                                        <button className="cancel">
                                            <img src="svg/close.svg" alt="" className="fn__svg" />
                                        </button>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default ChatSidebar;