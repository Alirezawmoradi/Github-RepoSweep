import React from "react";

export const AnimatedPlanet: React.FC = () => {
    return (
            <svg
                className="w-36 mx-auto planet-animation absolute overflow-hidden z-[-1]"
                viewBox="0 0 79 77"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M17.9199 6.43001C28.8899 -1.91999 46.8699 -2.15999 59.6899 5.87001C81.8499 19.75 85.3299 49.62 66.7599 66.54C56.8899 57.35 47.7699 47.55 39.6999 36.73C32.2599 26.75 24.5499 16.97 17.9199 6.43001Z"
                    fill="#35497A"
                />
                <path
                    d="M17.92 6.42999C20.09 6.60999 21.69 7.60999 22.66 9.56999C29.44 23.17 41.11 33.32 49.09 46.13C52.53 51.66 59.08 54.86 62.94 60.41C64.33 62.4 66.72 63.74 66.75 66.54C64.71 69.09 62.15 70.95 59.1 72.18C46.36 72.83 39.28 63.94 31.54 56.23C22.31 47.03 14.64 36.62 7.53997 25.78C6.33997 23.95 4.93997 22.08 5.75997 19.64C7.97997 13.61 12.3 9.45999 17.9 6.43999L17.92 6.42999Z"
                    fill="#328CAD"
                />
                <path
                    d="M5.78003 19.62C14.41 32.95 23.88 45.58 34.95 57.14C41.85 64.35 49.69 69.28 59.11 72.17C42.15 80.49 24.67 77.82 11.91 64.97C-0.099967 52.88 -2.54997 34.71 5.78003 19.62Z"
                    fill="#72B8C8"
                />
            </svg>
    );
};
