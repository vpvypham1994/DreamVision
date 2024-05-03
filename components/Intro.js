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
            startMarquee(marqueeElement); // Call the marquee function with the marquee element
        }
        animationText()
    }, []);

    return (
        <>
            <div className="techwave_fn_intro">
                <div className="first"><img src="img/intro/first.png" alt="" /></div>
                <div className="txt">
                    <h3>AI Admin Panel</h3>
                    <p>in themeforest market</p>
                </div>
                <div className="mac"><img src="img/intro/mac.png" alt="" /></div>
                <div className="txt_unlim">
                    <div className="TickerNews">
                        <div className="ti_wrapper">
                            <div className="ti_slide">
                                <div className="marquee" data-speed={30} ref={marqueeRef}>
                                    <div className="item">Generate Images —</div>
                                    <div className="item">&nbsp;AI Chat Bot —</div>
                                    <div className="item">&nbsp;The Best AI HTML Template Ever —</div>
                                    <div className="item">&nbsp;By Freniy Team —</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fn__center_title" id="img_gen">
                    <div className="lines">
                        <span className="l" />
                        <span className="c" />
                        <span className="r" />
                    </div>
                    <div className="text">
                        <h3 className="fn__animated_text">It Has Everything For AI Image Generation Platform</h3>
                    </div>
                </div>
                <div className="generation"><img src="img/intro/img-generation.png" alt="" /></div>
                <div className="or"><h1><span>Or / Or / Or</span></h1></div>
                <div className="fn__center_title">
                    <div className="text">
                        <h3 className="fn__animated_text">You could use it for AI Chat Bot platform</h3>
                    </div>
                </div>
                <div className="livechat">
                    <div className="fn__chatbot">
                        <div className="chat__list">
                            <div className="chat__item active">
                                <div className="chat__box your__chat">
                                    <div className="author"><span>You</span></div>
                                    <div className="chat">
                                        <p>What is a chat bot?</p>
                                    </div>
                                </div>
                                <div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>At the most basic level, a chatbot is a computer program that simulates and processes human conversation (either written or spoken), allowing humans to interact with digital devices as if they were communicating with a real person. Chatbots can be as simple as rudimentary programs that answer a simple query with a single-line response, or as sophisticated as digital assistants that learn and evolve to deliver increasing levels of personalization as they gather and process information.</p>
                                    </div>
                                </div>
                                <div className="chat__box your__chat">
                                    <div className="author"><span>You</span></div>
                                    <div className="chat">
                                        <p>How do chatbots work?</p>
                                    </div>
                                </div>
                                <div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>Chatbots boost operational efficiency and bring cost savings to businesses while offering convenience and added services to internal employees and external customers. They allow companies to easily resolve many types of customer queries and issues while reducing the need for human interaction.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat__comment">
                            <div className="fn__chat_comment">
                                <div className="new__chat">
                                    <p>Ask it questions, engage in discussions, or simply enjoy a friendly chat.</p>
                                </div>
                                <textarea rows={1} className="fn__hidden_textarea" tabIndex={-1} />
                                <textarea rows={1} placeholder="Send a message..." id="fn__chat_textarea" />
                                <button><img src="svg/enter.svg" alt="" className="fn__svg" /></button>
                            </div>
                        </div>
                        <img src="img/intro/click.png" alt="" className="chat_decor" />
                    </div>
                </div>
                <div className="fn__center_title" id="demos">
                    <div className="lines">
                        <span className="l" />
                        <span className="c" />
                        <span className="r" />
                    </div>
                    <div className="text">
                        <h3 className="big fn__animated_text">Template Demos</h3>
                        <p>It is designed to create a dynamic and immersive user interface that generates images based on user inputs and engages in meaningful conversations.</p>
                    </div>
                </div>
                <div className="templates">
                    <ul>
                        <li>
                            <div>
                                <Link className="top" href="/" target="_blank"><img src="img/intro/demo-dark.jpg" alt="" /></Link>
                                <div><Link href="/" target="_blank" className="techwave_fn_button"><span>Dark Version</span></Link></div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <Link className="top" href="/index-light" target="_blank"><img src="img/intro/demo-light.jpg" alt="" /></Link>
                                <div><Link href="/index-light" target="_blank" className="techwave_fn_button"><span>Light Version</span></Link></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
