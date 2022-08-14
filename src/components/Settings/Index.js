import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateTime,
    setLongBreakInterval,
    toggleAutoPomodoros,
    toggleMusic,
} from '../../redux/timerSlice';

import { Input } from './Input';
import Toggle from './Toggle';
import Label from './Label';
import Item from './Item';

const Settings = () => {
    const dispatch = useDispatch();
    const { modes, mode, music, autoPomodoros, longBreakInterval } =
        useSelector((state) => state.timer);

    return (
        <>
            <div className=" border-bottom pb-4">
                <Label children="Time (minutes)" />
                <div className=" d-flex justify-content-between">
                    {Object.values(modes).map(({ label, id, time }) => (
                        <Input
                            key={id}
                            type="number"
                            label={label}
                            value={time}
                            min={1}
                            onChange={(e) =>
                                dispatch(
                                    updateTime({
                                        mode: id,
                                        time: parseInt(e.target.value),
                                    }),
                                )
                            }
                        />
                    ))}
                </div>
            </div>
            <Item>
                <Label children="Music?" />
                <Toggle on={music} onClick={() => dispatch(toggleMusic())} />
            </Item>

            <Item>
                <Label children="Auto start Pomodoros?" />
                <Toggle
                    on={autoPomodoros}
                    onClick={() => dispatch(toggleAutoPomodoros())}
                />
            </Item>

            <Item>
                <Label children="Long Break Interval" />
                <Input
                    type="number"
                    value={longBreakInterval}
                    min={1}
                    onChange={(e) =>
                        dispatch(setLongBreakInterval(parseInt(e.target.value)))
                    }
                />
            </Item>
        </>
    );
};

export default Settings;
