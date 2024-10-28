import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import zIndex from '@mui/material/styles/zIndex';

const CircleLoader = () => {
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    useEffect(() => {
        // Add 'loading' class to body when the component mounts
        document.body.classList.add('loading');

        // Remove 'loading' class from body when the component unmounts
        return () => {
            document.body.classList.remove('loading');
        };
    }, []);

    const loadingContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'rgba(229, 234, 235, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: '11111',
    };

const loadingSpinnerStyle = {
    color: backgroundColor, // Optional: Customize the spinner color
};

return (
    <div style={loadingContainerStyle}>
        <CircularProgress style={loadingSpinnerStyle} />
        <span className="visually-hidden">Loading...</span>
    </div>
);
};

export default CircleLoader;
