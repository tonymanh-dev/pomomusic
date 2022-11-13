import startSound from '../assets/sounds/start.mp3';
import endBell from '../assets/sounds/end.mp3';

export const startAudio = new Audio(startSound);
export const endAudio = new Audio(endBell);

// Start sound
export const handlePlayStartSound = () => {
    startAudio.volume = 0.25;
    startAudio.play();
};
export const handlePauseStartSound = () => {
    endBell.pause();
};

// End sound
export const handlePlayEndSound = () => {
    endAudio.volume = 0.25;
    endAudio.play();
};

export const handlePauseEndSound = () => {
    endAudio.pause();
};
