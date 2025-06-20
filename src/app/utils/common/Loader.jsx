import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className='h-[100vh] w-[99vw] opacity-50 bg-black z-[80] absolute top-0 left-0'>
      <div className="loader z-[70] relative top-[50%] left-[50%]" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    border: 4px solid #E0D2C3;
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 4px solid #E0D2C3;
    border-left-color: transparent;
    width: 36px;
    height: 36px;
  }

  .loader {
    border: 4px solid #E0D2C3;
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;
