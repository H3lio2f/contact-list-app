import Cookies from "js-cookie";
import api from "../services/api";

export const fetchAllUsers = async () => {
  const token = Cookies.get("token");

  const users = await api.get("users", {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return users.data;
};

export const fetchAllContacts = async () => {
  const token = Cookies.get("token");

  const users = await api.get("contacts", {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return users.data;
};

export const showContactDetails = async (id) => {
  const token = Cookies.get("token");

  const contact = await api.get(`/contacts/${id}`, {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return contact.data;
};

export const showUserDetails = async (id) => {
  const token = Cookies.get("token");

  const user = await api.get(`/users/${id}`, {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return user.data;
};
