import React from 'react';
import styled from 'styled-components';

export default function NextServiceButton ({setActiveStep}) {

  return (
    <StyledWrapper>
      <button onClick={()=>setActiveStep((state)=>state+1)}> Next
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow,transform;
    background: radial-gradient( 100% 100% at 100% 0%, #FFFFFF 0%, #FFFFFF 100% );
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #E0D2C3;
    height: 2.6em;
    text: #E0D2C3;
    transition: box-shadow 0.15s ease, transform 0.15s ease;
  }

  button:hover {
    box-shadow: 0px 0.1em 0.2em #FFFFFF, 0px 0.4em 0.7em -0.1em #FFFFFF, inset 0px -0.1em 0px #FFFFFF;
    transform: translateY(-0.1em);
  }

  button:active {
    box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
    transform: translateY(0em);
  }`;

