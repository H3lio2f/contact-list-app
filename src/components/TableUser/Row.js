import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
//import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from "notistack";
import { IconButton, Menu, MenuItem, TableCell, TableRow, Tooltip } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useGlobal } from "../../utils/contexts/global";
import Link from 'next/link';
import * as React from 'react';

import {
  deleteUser
} from "../../utils/persistData";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Row({ row, labelId }) {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { refresh, setRefresh  } = useGlobal();

  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = id => {
    deleteUser(id)
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
                : "Erro ao excluir o usuario"
            }`,
            icon: "warning",
            confirmButtonColor: "var(--primary)",
          });
        });
  }

    return (
      <>
    <TableRow
        tabIndex={-1}
        key={row.name}
        style={{ cursor: "pointer"}}
    >
        <TableCell align="left">
        </TableCell>
        <TableCell align="left">
          <Link href={`users/${row._id}`}>
            <a style={{color: "var(--primary)"}}>{row.name}</a>
          </Link>
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.role.toUpperCase()}</TableCell>
        <TableCell align="center">
        <>
            <Tooltip title="Op????es">
            <IconButton
                onClick={handleClickOptions}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <SettingsIcon />
            </IconButton>
            </Tooltip>
        <StyledMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {/* <Link href={`/users/${row._id}`} underline="none">
              <a>
                <MenuItem disableRipple>
                  <VisibilityIcon />
                  Visualizar
                </MenuItem>
              </a>
            </Link> */}
            <MenuItem disableRipple onClick={() => handleDelete(row._id)}>
                <DeleteIcon />
                Excluir
              </MenuItem>
        </StyledMenu>
        </>
        </TableCell>
    </TableRow>
    </>
    );
}
