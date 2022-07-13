import EditIcon from '@mui/icons-material/Edit';
import {  MenuItem, TextField } from '@mui/material';
import { Container } from "./styles";
import FormUpdateUser from "../FormUpdateUser/";
import CardBase from "../AddCard/CardBase";
import { useGlobal } from "../../utils/contexts/global";

const UserDetails = ({ user }) => {
  const { showUpdateUser, setShowUpdateUser } = useGlobal();

  return (
    <Container className="user-details" >
    <CardBase isShown={showUpdateUser} setIsShown={() => setShowUpdateUser(false)}>
      <FormUpdateUser user={user} />
    </CardBase>
        <div className="options">
          <MenuItem disableRipple onClick={ () => setShowUpdateUser(true)}>
            <EditIcon />
            Editar
          </MenuItem>
        </div>
        <div className="top-detail">
            <div className="list-info">
        
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Nome"
                  value={user?.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
              <TextField
                fullWidth
                  id="outlined-read-only-input"
                  label="Email"
                  value={user?.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Senha"
                  value={user?.password}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Nível de acesso"
                  value={user?.role}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
        </div>
    </Container>
  );
};

export default UserDetails;
