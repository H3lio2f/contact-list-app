import Head from "next/head";
import { useState, useEffect} from 'react';
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/contactDetails';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import { useGlobal } from "../../../utils/contexts/global";

import { showUserDetails} from '../../../utils/fetchData';

const UserDetails = dynamic(() => import("../../../components/UserDetails"));

export default function DetailUser() {
  const {  refresh } = useGlobal();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const id = router.query.id;

  useEffect(() => {
    showUserDetails(id).then(data => {
      setUser(data.data);
    })
  }, [refresh])

  return (
    <>
      <Head>
        <title>Contact List App - Detalhes do usuário</title>
        <meta name="description" content="Contact List App - Usuario" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
        <UserDetails user={user} />
      </div>
      </Container>
      </Layout>
    </>
  );
}
