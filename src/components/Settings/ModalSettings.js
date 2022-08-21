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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalSettings = ({ closeModal, isShow }) => {
    const dispatch = useDispatch();
    const { modes, music, autoPomodoros, longBreakInterval } = useSelector(
        (state) => state.timer,
    );

    return (
        <div>
            <Modal show={isShow} onHide={closeModal}>
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
                                                    dispatch(
                                                        updateTime({
                                                            mode: id,
                                                            time: parseInt(
                                                                e.target.value,
                                                            ),
                                                        }),
                                                    )
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                            <Item>
                                <Label children="Auto play music when start timer?" />
                                <Toggle
                                    on={music}
                                    onClick={() => dispatch(toggleMusic())}
                                />
                            </Item>

                            <Item>
                                <Label children="Auto start Pomodoros?" />
                                <Toggle
                                    on={autoPomodoros}
                                    onClick={() =>
                                        dispatch(toggleAutoPomodoros())
                                    }
                                />
                            </Item>

                            <Item>
                                <Label children="Long Break Interval" />
                                <Input
                                    type="number"
                                    value={longBreakInterval}
                                    min={1}
                                    onChange={(e) =>
                                        dispatch(
                                            setLongBreakInterval(
                                                parseInt(e.target.value),
                                            ),
                                        )
                                    }
                                />
                            </Item>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 px-0 pb-0">
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
