'use client'

import styled from '@emotion/styled'
import colors from '../util/colors'

export const PageWrapper = styled.div`
  display: flex;
  max-width: fit-content;
  width: auto;
  height: 100vh;
  padding: 4rem 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
`

export const TitleText = styled.h1`
  color: #fff;
  text-align: center;
  font-family: 'Zilla Slab Highlight', cursive;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.14rem;
  margin-bottom: 1rem;
`

export const CustomBox = styled.div`
  display: flex;
  padding: 1rem;
  width: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0);
  background: ${colors.black};
`

export const Wrapper = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`

export const SettingsWrapper = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 550px) {
    gap: 0.4rem;
    padding: 0.8rem 0.5rem;
    font-size: xx-small;
  }
`

export const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 3px solid rgba(255, 255, 255, 0);
  color: #fff;
  text-align: center;
  font-family: 'Viga', sans-serif;
  font-size: 0.9rem;
  font-weight: 550;
  padding: 0.4rem 1.5rem;
  transition:
    background-color 0.1s,
    border-color 0.2s,
    opacity 0.1s;

  &:hover {
    cursor: pointer;
    border: 3px solid rgba(255, 255, 255, 0.7);
  }

  &:active {
    border: 3px solid rgba(255, 255, 255, 0);
    opacity: 0.8;
  }

  @media (max-width: 550px) {
    padding: 0.3rem 1.1rem;
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
  }
`

export const CustomInput = styled.input`
  display: inline;
  color: white;
  font-family: 'Zilla Slab', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.04375rem;
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid rgba(153, 153, 153, 0.44);
  background: ${colors.grey};
  padding: 0.5rem 1rem;
  outline: none;

  &:focus {
    color: #ffffff;
    border-color: #00a839;
  }

  &::placeholder {
    color: #999;
  }
`

export const WaitingText = styled.h1`
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 550;
  letter-spacing: -0.07rem;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SimpleText = styled.text`
  color: #fff;
  text-align: center;
  font-family: 'Viga', sans-serif;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`

export const PlayerDisplayBox = styled.div`
  display: flex;
  padding: 0.25rem 1.25rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 20rem;
  border-radius: 1.25rem;
  background: ${colors.darkblue};

  @media (max-width: 550px) {
    gap: 8.5rem;
    flex-direction: row;
  }
`

export const PlayerAndIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`
