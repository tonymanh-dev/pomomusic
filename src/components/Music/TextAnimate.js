import React from 'react';
import styled, { keyframes } from 'styled-components';

const rightToLeft = keyframes`
0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-30%);
  }
`;

const Title = styled.p`
    -webkit-animation-name: ${rightToLeft};
    -webkit-animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`;

const TextAnimate = ({ title }) => {
    return (
        <div
            className="lh-1 position-relative"
            style={{
                gridArea: 'title',
                justifySelf: 'start',
                width: '100%',
            }}
        >
            <Title
                id="animate"
                className="lh-sm fw-bold text-nowrap position-relative"
                style={{ fontSize: '12px', zIndex: '-100' }}
            >
                {title}
            </Title>
        </div>
    );
};

export default TextAnimate;
