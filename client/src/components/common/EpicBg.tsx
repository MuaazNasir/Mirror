import React, { useState, useEffect } from 'react';

function RandomTextBackground() {
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

    // Function to generate a random large string
    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const stringLength = 10000; // Adjust the length as needed
        let randomString = '';
        for (let i = 0; i < stringLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    // Function to change the background with random text
    function changeBackground() {
        const newBackgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setBackgroundColor(newBackgroundColor);
    }

    // Attach onMouseMove event listener to the body when the component mounts
    useEffect(() => {
        document.body.addEventListener('mousemove', changeBackground);

        // Clean up the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('mousemove', changeBackground);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute', // Fixed position
                top: '0',
                left: '0',
                width: '100vw', // Cover the entire viewport width
                height: '100vh', // Cover the entire viewport height
                backgroundColor: backgroundColor,
                opacity : 0.1,
                transition: 'background-color 0.3s',
                fontSize: '24px',
                textAlign: 'center',
                whiteSpace: 'pre', // Use 'pre' to keep line breaks
                overflow: 'hidden', // Hide overflow
            }}
            className=''
        >

        </div>
    );
}

export default RandomTextBackground;
