'use client';

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";

export function Stars() {
    const [init, setInit] = useState(false);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    useEffect(() => {
        initParticlesEngine(particlesInit).then(() => {
            setInit(true);
        });
    }, [particlesInit]);

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: {
                zIndex: 1,
                enable: true,
            },
            retina_detect: true,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                    polygon: {
                        sides: 5,
                    },
                },
                opacity: {
                    value: 1,
                    random: {
                        enable: true,
                    },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0,
                        sync: false,
                    },
                },
                size: {
                    value: 2,
                    random: {
                        enable: true,
                    },
                    animation: {
                        enable: false,
                        speed: 4,
                        minimumValue: 0.3,
                        sync: false,
                    },
                },
                links: {
                    enable: false,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.8,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: MoveDirection.none,
                    random: true,
                    straight: false,
                    outModes: {
                        default: OutMode.out,
                    },
                    bounce: false,
                    attract: {
                        enable: false,
                        rotate: {
                            x: 600,
                            y: 600,
                        },
                    },
                },
                rotate: {
                    value: 0,
                    random: {
                        enable: true,
                    },
                    direction: "clockwise",
                    animation: {
                        enable: true,
                        speed: 5,
                        sync: false,
                    },
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: {
                        enable: true,
                        delay: 0.5,
                    },
                },
                modes: {
                    grab: {
                        distance: 100,
                        links: {
                            opacity: 0.3,
                        },
                    },
                    bubble: {
                        size: 0,
                        speed: 3,
                        opacity: 0,
                        duration: 2,
                        distance: 250,
                    },
                    repulse: {
                        duration: 0.4,
                        distance: 400,
                    },
                    push: {
                        quantity: 4,
                    },
                    remove: {
                        quantity: 2,
                    },
                },
            },
        }),
        []
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                className='fadeInOut'
                options={options}
            />
        );
    }

    return null;
}
