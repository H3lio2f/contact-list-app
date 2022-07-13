import Cookies from "js-cookie";
import api from "../services/api";

export const addNewContact = async ({
  name,
  email,
  phone,
}) => {

  const token = Cookies.get("token");

  const contact = await api.post("/contacts", 
  {
    name,
    email,
    phone
  },
  {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return contact;
};

export const addNewUser = async ({ 
  name,
  email,
  password
}) => {

  const token = Cookies.get("token");

  const user = await api.post("/signup", 
  { 
    name,
    email,
    password,
    role: "user"
  },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    }
  );
  return user;
};

export const updateContact = async ({
  id,
  name,
  email,
  phone
}) => {

  const token = Cookies.get("token");
  
  const contact = await api.put(
    `/contacts/${id}`,
    {
      name,
      email,
      phone
    },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    });
  return contact;
};

export const updateUser = async ({
  id,
  name,
  email,
  password,
  role
}) => {

  const token = Cookies.get("token");
  
  const user = await api.put(
    `/users/${id}`,
    {
      name,
      email,
      password,
  role
    },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    });
  return user;
};

export const deleteContact = async (id) => {
  const token = Cookies.get("token");

  const data = await api.delete(`/contacts/${id}`,
  {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return data.data;
};

export const deleteUser = async (id) => {
  const token = Cookies.get("token");

  const data = await api.delete(`/users/${id}`,
  {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return data.data;
};

export const enableContact = async (id) => {
  const token = Cookies.get("token");

  const contact = await api.patch(`/contacts/${id}/enable`,
  {
    status_id: 0
  },
  {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return contact.data;
};

export const desableContact = async (id) => {
  const token = Cookies.get("token");

  const contact = await api.patch(`/contacts/${id}/desable`,
  {
    status_id: 0
  },
  {
    headers: {
      'x-auth-token': `${token}`,
    },
  });
  return contact.data;
};


