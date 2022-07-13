import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import ForkRightIcon from '@mui/icons-material/LocalActivity';
import { useSnackbar } from "notistack";
import {  MenuItem, TextField } from '@mui/material';
import { Container } from "./styles";
import FormUpdateContact from "../FormUpdateContact/";
import CardBase from "../AddCard/CardBase";
import { useGlobal } from "../../utils/contexts/global";

import {
  enableContact,
  desableContact
} from "../../utils/persistData";

const ContactDetails = ({ contact }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showUpdateContact, setShowUpdateContact, setRefresh, refresh } = useGlobal();

  const handleDesable = id => {
    desableContact(id)
    .then(({ message }) => {
      setRefresh(!refresh);
      enqueueSnackbar(message, {
        variant: "success",
      });
    })
    .catch(({ response }) => {
      Swal.fire({
        text: `${
          response.data.message
            ? response.data.message
            : "Erro ao excluir o bloquear o contacto"
        }`,
        icon: "warning",
        confirmButtonColor: "var(--primary)",
      });
    });
  }

  const handleEnable = id => {
    enableContact(id)
    .then(({ message }) => {
      setRefresh(!refresh);
      enqueueSnackbar(message, {
        variant: "success",
      });
    })
    .catch(({ response }) => {
      Swal.fire({
        text: `${
          response.data.message
            ? response.data.message
            : "Erro ao excluir o desbloquear o contacto"
        }`,
        icon: "warning",
        confirmButtonColor: "var(--primary)",
      });
    });
  }


  return (
    <Container className="contact-details" >
    <CardBase isShown={showUpdateContact} setIsShown={() => setShowUpdateContact(false)}>
      <FormUpdateContact contact={contact} />
    </CardBase>
        <div className="options" >
            {contact?.status === 1 && (
              <MenuItem disableRipple onClick={() => handleDesable(contact._id)}>
                <BlockIcon />
                Bloquear
              </MenuItem>
            )}
            {contact?.status === 0 && (
              <MenuItem disableRipple onClick={() => handleEnable(contact._id)}>
                <ForkRightIcon />
                Desbloquear
              </MenuItem>
            )}
          <MenuItem disableRipple onClick={ () => setShowUpdateContact(true)}>
            <EditIcon />
            Editar
          </MenuItem>
        </div>
        <div className="top-detail" style={contact?.status === 0 ? { borderLeft: "4px solid red"} : {}}>
            <div className="list-info" >
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Nome"
                  value={contact?.name}
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
                  value={contact?.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Telefone"
                  value={contact?.phone}
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

export default ContactDetails;
