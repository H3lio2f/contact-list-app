import Head from "next/head";
import { useState, useEffect} from 'react';
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/contactDetails';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import { useGlobal } from "../../../utils/contexts/global";

import { showContactDetails} from '../../../utils/fetchData';

const ContactDetails = dynamic(() => import("../../../components/ContactDetails"));

export default function DetailContact() {
  const {  refresh } = useGlobal();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const id = router.query.id;

  useEffect(() => {
    showContactDetails(id).then(data => {
      console.log(id);
      setContact(data.data);
    })
  }, [refresh])

  return (
    <>
      <Head>
        <title>Contact List App - Detalhes do contacto</title>
        <meta name="description" content="Contact List App - Detalhes do contacto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
        <ContactDetails contact={contact} />
      </div>
      </Container>
      </Layout>
    </>
  );
}
