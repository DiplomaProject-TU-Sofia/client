"use client";
import React from "react";
import styled from "styled-components";

const SmoothButton = ({ name }) => {
  return (
    <StyledWrapper>
      {name == "Reserve Now" ? (
        <button>{name}</button>
      ) : (
        <button> <a href="tel:+4733378901">{name}</a></button>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    align-items: center;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: none;
    text-transform: uppercase;
    outline: 0;
    border: 1px solid white;
    padding: 0.5rem;
    z-index: 5;
  }

  button:before {
    background-color: #fff;
    content: "";
    display: inline-block;
    height: 1px;
    margin-right: 10px;
    transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
    width: 0;
  }

  button:hover:before {
    background-color: #fff;
    width: 3rem;
  }
`;

export default SmoothButton;
