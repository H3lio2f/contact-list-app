import React, { useState, useEffect} from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'

import { fetchAllUsers} from '../../utils/fetchData';

const UserComponent = dynamic(() => import("../../components/UserComponent"));

export default function users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchAllUsers().then(data => {
      setUsers(data.data);
    })
  }, [])

  return (
    <>
      <Head>
        <title>Contact List App - Nossos Useres</title>
        <meta name="description" content="Contact List App - Usuarios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <UserComponent users={users} />
    </>
  );
}