"use client"
import React, { useState, useEffect } from 'react';

function AnimatedText() {
  const [letters, setLetters] = useState([]);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    const element = document.querySelector('.fn__animated_text');
    const text = element.textContent;
    const time = parseInt(element.getAttribute('data-wait')) || 0;
    const speed = parseFloat(element.getAttribute('data-speed')) || 4;
    const speedInSeconds = speed / 100;

    const updateLetters = () => {
      setStop(true);
      setTimeout(() => {
        setLetters(text.split(''));
      }, time);
    };

    const waypointHandler = () => {
      if (!stop) {
        updateLetters();
      }
    };

    element.classList.add('ready');

    const waypoint = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          waypointHandler();
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    });

    waypoint.observe(element);

    return () => {
      waypoint.unobserve(element);
    };
  }, [stop]);

  return (
    <p className={`fn__animated_text ${stop ? 'stop' : ''}`}>
      {letters.map((letter, index) => (
        <span key={index} style={{ animationDelay: index * 0.04 + 's' }}>{letter}</span>
      ))}
    </p>
  );
}

export default AnimatedText;
