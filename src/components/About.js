import React from 'react';
import Footer from './Footer';

const heading = 'fs-3 fw-bold';
const paragraph = 'fs-4 text-start lh-lg';

const About = () => {
    return (
        <div
            id="about"
            className="container-sm px-md-5 "
            style={{ paddingTop: '68px', marginBottom: '100px' }}
        >
            <div className="row px-2 px-md-5 ">
                <article className="d-flex flex-column">
                    <section>
                        <h2 className="text-primary fs-3 fw-bold">Pomomusic</h2>
                        <p className={paragraph}>
                            Pomomusic is a customizable pomodoro timer app, that
                            works on desktop & mobile browser. The aim of this
                            app is to help you focus on any task you are working
                            on, such as study, writing, or coding.
                        </p>
                        <h2 className={heading}>
                            What is the Pomodoro Technique?
                        </h2>
                        <p className={paragraph}>
                            The Pomodoro Technique was developed in the late
                            1980s by then university student Francesco Cirillo.
                            Cirillo was struggling to focus on his studies and
                            complete assignments. Feeling overwhelmed, he asked
                            himself to commit to just 10 minutes of focused
                            study time. Encouraged by the challenge, he found a
                            tomato (pomodoro in Italian) shaped kitchen timer,
                            and the Pomodoro technique was born. Though Cirillo
                            went on to write a 130-page book about the method,
                            its biggest strength is its simplicity:
                        </p>
                        <div className="text-center w-100">
                            <img
                                className="border-1 img-fluid"
                                src="https://images.ctfassets.net/dm4oa8qtogq0/390glBwOnV44EyoPoiJC6Z/3ddbb50dbc61e3a11afc6b05aa9e21ab/productivity-method_pomodoro-summary.jpg"
                                alt=""
                            />
                        </div>

                        <h2 className={heading}>
                            Try the Pomodoro Technique if you...
                        </h2>
                        <p className={paragraph}>
                            Find little distractions often derail the whole
                            workday Consistently work past the point of optimal
                            productivity Have lots of open-ended work that could
                            take unlimited amounts of time (e.g., studying for
                            an exam, research for a blog post, etc.) Are overly
                            optimistic when it comes to how much you can get
                            done in a day (aren't we all 🤪) Enjoy gamified
                            goal-setting Really like tomatoes.
                        </p>
                    </section>

                    <section
                        id="howIsWork"
                        style={{ zIndex: '-9999', paddingTop: '68px' }}
                    >
                        <ul className="list-group list-group-numbered ">
                            <h2 className={heading}>How is work?</h2>

                            {[
                                'Set your timer and add tasks to work on today',
                                'Grab some music if you want something to boost your mood',
                                'Start timer and focus on a single task until the timer rings. ',
                                'When a task is done, mark off what you completed',
                                'Then enjoy a 5 minute break. After each pomodoros, take a longer ',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="list-group-item border-0 fs-4"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="mt-3">
                        <h2 className={heading}>Features</h2>
                        <ul className={paragraph}>
                            <li>
                                Responsive design that works with desktop and
                                mobile
                            </li>
                            <li>
                                Customizable timer intervals to suit your
                                preference
                            </li>
                            <li>Task list to manage your works</li>
                            <li>Music background during Pomodoro section</li>
                            <li>Custom your favorite music</li>
                        </ul>
                    </section>
                    <Footer />
                </article>
            </div>
        </div>
    );
};

export default About;
