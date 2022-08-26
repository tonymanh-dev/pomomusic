import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';

import {
    updateTime,
    setLongBreakInterval,
    toggleAutoPomodoros,
    toggleAutoMusic,
} from '../../redux/timerSlice';

import { Input } from './Input';
import Toggle from './Toggle';
import Label from './Label';
import Item from './Item';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LONG_BREAK, POMODORO, SHORT_BREAK } from '../../Utils/constant';
import Tippy from '@tippyjs/react';

const ModalSettings = ({ closeModal, isShow }) => {
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const { modes, music, autoPomodoros, longBreakInterval } = useSelector(
        (state) => state.timer,
    );

    // Handle update setting to firebase
    const handelUpdateSetting = async (payload) => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, payload);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Handle update timer
    const handleUpdateTimer = ({ mode, time }) => {
        if (user) {
            let payload = null;
            switch (mode) {
                case POMODORO: {
                    payload = { 'timer.modes.pomodoro.time': time };
                    break;
                }
                case SHORT_BREAK: {
                    payload = { 'timer.modes.short_break.time': time };
                    break;
                }
                case LONG_BREAK: {
                    payload = { 'timer.modes.long_break.time': time };
                    break;
                }
                default: {
                    return;
                }
            }
            handelUpdateSetting(payload);
        } else {
            dispatch(updateTime({ mode, time }));
        }
    };

    const handleSettingMusic = () => {
        if (user) {
            handelUpdateSetting({
                'timer.music': !music,
            });
        } else {
            dispatch(toggleAutoMusic());
        }
    };

    const handleAutoPomodoros = () => {
        if (user) {
            handelUpdateSetting({
                'timer.autoPomodoros': !music,
            });
        } else {
            dispatch(toggleAutoPomodoros());
        }
    };

    const handleSetLongInterval = (value) => {
        if (user) {
            handelUpdateSetting({
                'timer.longBreakInterval': value,
            });
        } else {
            dispatch(setLongBreakInterval(value));
        }
    };

    return (
        <div>
            <Modal show={isShow} onHide={closeModal} style={{ top: '30px' }}>
                <div className="p-4">
                    <Modal.Header className="p-0 pb-3">
                        <div className="d-flex align-items-center w-100 ">
                            <h6 className="fs-4 text fw-bold text-secondary">
                                Settings
                            </h6>

                            <button
                                type="button"
                                className="btn-close border-0"
                                onClick={closeModal}
                            ></button>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="px-0">
                        <div className="">
                            <div className=" border-bottom pb-4">
                                <Label children="Time (minutes)" />
                                <div className=" d-flex justify-content-between">
                                    {Object.values(modes).map(
                                        ({ label, id, time }) => (
                                            <Input
                                                key={id}
                                                type="number"
                                                label={label}
                                                value={time}
                                                min={1}
                                                onChange={(e) =>
                                                    handleUpdateTimer({
                                                        mode: id,
                                                        time: parseInt(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                            <Item>
                                <Label children="Auto play music when started?" />
                                <Toggle
                                    on={music}
                                    onClick={handleSettingMusic}
                                />
                            </Item>

                            <Item>
                                <Label children="Auto start Pomodoros?" />
                                <Toggle
                                    on={autoPomodoros}
                                    onClick={handleAutoPomodoros}
                                />
                            </Item>

                            <Item>
                                <Label children="Long Break Interval" />
                                <Input
                                    type="number"
                                    value={longBreakInterval}
                                    min={1}
                                    onChange={(e) =>
                                        handleSetLongInterval(
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                            </Item>
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        className="border-0 px-0 pb-0 d-flex "
                        style={{
                            justifyContent: user ? 'end' : 'space-between',
                        }}
                    >
                        {!user && (
                            <span className="text-muted text-start">
                                You need to log in to save settings
                                <Tippy content="It will be disappear after you refresh browser">
                                    <i className="bi bi-exclamation-circle text-primary ms-1"></i>
                                </Tippy>
                            </span>
                        )}
                        <Button
                            variant="primary"
                            className="rounded-5 py-2 px-4 fw-bold fs-5 text-light"
                            onClick={closeModal}
                        >
                            Okay
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
};

export default ModalSettings;
