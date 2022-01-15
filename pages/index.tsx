import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from '../dashboard/Dashboard'
import { baseApiBack } from '../services/settings';

interface Props {
  dataPastel?: any;
  dataSalgado?: any;
  dataBebida?: any;
  dataPedido?: any;
}

const Home: NextPage<Props> = ({ dataPastel, dataSalgado, dataBebida, dataPedido }) => {
  return (
    <Dashboard data={[dataPastel, dataSalgado, dataBebida,dataPedido]} visible={{makeOrder:true,orders:true}} />
  )
}

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(`${baseApiBack}/pastel`);
  const dataPastel = await res.json();
  const res2 = await fetch(`${baseApiBack}/salgado`);
  const dataSalgado = await res2.json();
  const res3 = await fetch(`${baseApiBack}/bebida`);
  const dataBebida = await res3.json();
  const res4 = await fetch(`${baseApiBack}/pedidos`,{ method: "GET"});
  const dataPedido = await res4.json();
  return { dataPastel, dataSalgado, dataBebida,dataPedido }
}



export default Home
