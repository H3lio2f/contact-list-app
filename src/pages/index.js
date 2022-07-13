import React, { useState, useEffect} from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic';

import { fetchAllContacts} from '../utils/fetchData';

const ContactComponent = dynamic(() => import("../components/ContactComponent"));

export default function Home() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    fetchAllContacts().then(data => {
      setContacts(data.data);
    })
  }, [])

  return (
    <>
      <Head>
        <title>Contact List APP - Minhas Tarefas</title>
        <meta name="description" content="Contact List APP - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <ContactComponent contacts={contacts} />
      
    </>
  );
}
