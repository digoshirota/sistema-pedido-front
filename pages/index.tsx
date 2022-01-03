import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from './dashboard/Dashboard'
import { baseApiBack } from '../services/settings';

interface Props {
  dataPastel?: any;
}

const Home: NextPage<Props> = ({ dataPastel }) => {
  return (
    <Dashboard data={dataPastel} />
  )
}

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(`${baseApiBack}/pastel`);
  const dataPastel = await res.json();
  return { dataPastel }
}



export default Home
