import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Container } from "./styles";
import { useAuth } from "../../utils/contexts/auth";

import Cookies from "js-cookie";
import decoder from 'jwt-decode';

export default function TopBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  const hendlelogout =  () => {
    logout();
    router.reload();
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = decoder(token);
    setUser(decoded);
  }, [])

  return (
    <Container>
      <div className="inner-container">
        <div className="user dropdown-container">
          <div className="dropdown-header" >
            <div className="logged-in">
              <span>{user?.name}</span> <label className="role">({user?.role})</label>
            </div>
            <span className="logout"  onClick={hendlelogout}>Terminar sessão</span>
          </div>
          <div
            className="dropdown-list-container"
            style={
              isOpen === true
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
          >
          </div>
        </div>
      </div>
    </Container>
  );
}
