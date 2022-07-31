import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';

const Settings = () => {
    const { updateExecute, settingBtn } = useContext(AppContext);
    const [timer, setTimer] = useState({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 10,
        active: 'pomodoro',
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setTimer((prev) => {
            return {
                ...prev,
                [name]: parseInt(value),
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateExecute(timer);
    };

    useEffect(() => updateExecute(timer), []);

    console.log(timer);

    return (
        <div className="container d-flex column">
            <form>
                <div className="">
                    <label>Pomodoro</label>
                    <input
                        type="number"
                        className="input"
                        name="pomodoro"
                        onChange={handleChange}
                        value={timer.pomodoro}
                    />
                    <label>Short Break</label>

                    <input
                        type="number"
                        className="input"
                        name="shortBreak"
                        onChange={handleChange}
                        value={timer.shortBreak}
                    />
                    <label>Long Break</label>

                    <input
                        type="number"
                        className="input"
                        name="longBreak"
                        onChange={handleChange}
                        value={timer.longBreak}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Settings;
