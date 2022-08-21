import React from 'react';
import Button from './MusicBtn';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMute, handleVolumeChange } from '../../redux/musicSlice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const pColor = { backgroundColor: '#f4664c' };
const wColor = { backgroundColor: '#ffff' };

const Volume = () => {
    const dispatch = useDispatch();
    const { muted, volume } = useSelector((state) => state.music);

    const VolumeIcon = () => {
        if (muted || volume === 0) {
            return (
                <Button
                    type="bi bi-volume-mute-fill"
                    onClick={() => dispatch(toggleMute())}
                />
            );
        } else if (volume < 50) {
            return (
                <Button
                    type="bi bi-volume-down-fill"
                    onClick={() => dispatch(toggleMute())}
                />
            );
        } else
            return (
                <Button
                    type="bi bi-volume-up-fill"
                    onClick={() => dispatch(toggleMute())}
                />
            );
    };

    return (
        <>
            <div className="d-flex justify-content-end align-items-center w-50 gap-2">
                <VolumeIcon />

                <div className=" w-100">
                    <Slider
                        min={0}
                        max={100}
                        value={muted ? 0 : volume * 100}
                        onChange={(e) => {
                            dispatch(handleVolumeChange(e));
                        }}
                        // Styles
                        trackStyle={wColor}
                        railStyle={{ background: 'rgba(255,255,255, 0.2' }}
                        dotStyle={pColor}
                        activeDotStyle={{
                            pColor,
                        }}
                        handleStyle={{
                            border: 'none',
                            wColor,
                            opacity: '1',
                            boxShadow:
                                volume === 0 || muted
                                    ? 'none'
                                    : '0px 0px 0px 2px rgba(255,255,255, 0.2)',

                            height: '10px',
                            width: '10px',
                            marginTop: '-3px',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Volume;
