import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Item } from "./styles";

import Cookies from "js-cookie";
import decoder from 'jwt-decode';

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = decoder(token);
    setUser(decoded);
  }, [])


  return (
    <Container>
      <div className="logo">
        <strong>My</strong>Contacts
      </div>
      <nav className="menu">
        <ul>
          <Item
            className={router.pathname === "/" ? "active" : ""}
            onClick={() => router.push('/')}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M15.41 5.41L10.58 0.58C10.21 0.21 9.7 0 9.17 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6.83C16 6.3 15.79 5.79 15.41 5.41ZM6.23 15.29L4.11 13.17C3.72 12.78 3.72 12.15 4.11 11.76C4.5 11.37 5.13 11.37 5.52 11.76L6.93 13.17L10.47 9.63C10.86 9.24 11.49 9.24 11.88 9.63C12.27 10.02 12.27 10.65 11.88 11.04L7.64 15.28C7.26 15.68 6.62 15.68 6.23 15.29ZM10 7C9.45 7 9 6.55 9 6V1.5L14.5 7H10Z"
                fill="white"
              />
            </svg>
            <Link href="/">
              <a> Contactos </a>
            </Link>
          </Item>
          {user?.role === "admin" && (    
            <Item
              className={router.pathname === "/users" ? "active" : ""}
              onClick={() => router.push('/users')}
            >
              <svg
                width="24"
                height="12"
                viewBox="0 0 24 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  d="M12 6.75C13.63 6.75 15.07 7.14 16.24 7.65C17.32 8.13 18 9.21 18 10.38V11C18 11.55 17.55 12 17 12H7C6.45 12 6 11.55 6 11V10.39C6 9.21 6.68 8.13 7.76 7.66C8.93 7.14 10.37 6.75 12 6.75ZM4 7C5.1 7 6 6.1 6 5C6 3.9 5.1 3 4 3C2.9 3 2 3.9 2 5C2 6.1 2.9 7 4 7ZM5.13 8.1C4.76 8.04 4.39 8 4 8C3.01 8 2.07 8.21 1.22 8.58C0.48 8.9 0 9.62 0 10.43V11C0 11.55 0.45 12 1 12H4.5V10.39C4.5 9.56 4.73 8.78 5.13 8.1ZM20 7C21.1 7 22 6.1 22 5C22 3.9 21.1 3 20 3C18.9 3 18 3.9 18 5C18 6.1 18.9 7 20 7ZM24 10.43C24 9.62 23.52 8.9 22.78 8.58C21.93 8.21 20.99 8 20 8C19.61 8 19.24 8.04 18.87 8.1C19.27 8.78 19.5 9.56 19.5 10.39V12H23C23.55 12 24 11.55 24 11V10.43ZM12 0C13.66 0 15 1.34 15 3C15 4.66 13.66 6 12 6C10.34 6 9 4.66 9 3C9 1.34 10.34 0 12 0Z"
                  fill="white"
                />
              </svg>
              <Link href="/users">
              <a> Usuários </a>
            </Link>
          </Item>
          )}
        </ul>
      </nav>
      <div className="copy">
        <span>Powered by:</span>
        <p>Helio2f</p>
      </div>
    </Container>
  );
}
