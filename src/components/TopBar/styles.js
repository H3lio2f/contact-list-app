import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 85%;
  z-index: 2;
  grid-area: topbar;
  height: 70px;
  background-color: var(--primary);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  .inner-container {
    max-width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  .user {
    margin-left: 50px;
    z-index: 2;
    position: relative;
    .dropdown-header {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .dropdown-list-container {
      transition: 150ms transform;
      transform-origin: top bottom;
      .dropdown-list {
        width: 100%;
        position: absolute;
        left: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 10px 20px 10px;
        margin-top: 8px;
        background: #ffffff;
        box-shadow: 0px 7px 12px -3px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: var(--font-size-7);
        li {
          list-style: none;
          margin-bottom: 0.8em;
          margin-top: 8px;
        }
      }
    }
    .logged-in {
      margin: 0 10px;
      color: var(--white);
      span {
        text-transform: capitalize;
      }
      .role{
        font-size: .9rem;
      }
    }
    .logout{
      font-size: var(--font-size-7);
      color: var(--white);
      margin-left: 1.2rem;;
    }
  }
`;