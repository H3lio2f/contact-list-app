import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  width: auto;
  align-items: center;
  background: var(--primary);
  padding: 12px 25px;
  border-radius: 5px;
  font-size: var(--font-size-7);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  span {
    color: var(--white);
  }
  &:hover {
    background: var(--hover);
  }
  &:disabled {
    opacity: 0.5;
    cursor: unset;
    background: var(--secondary);
  }
  svg {
    margin-left: 10px;
  }
`;