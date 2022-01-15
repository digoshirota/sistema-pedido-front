import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from './dash-listPedido'
import { baseApiBack } from '../../services/settings';

interface Props {
  dataPastel?: any;
  dataSalgado?: any;
  dataBebida?: any;
  dataPedido?:any;
}

const ListPedidos: NextPage<Props> = ({ dataPedido  }) => {
  return (
    <Dashboard data={[dataPedido]} />
  )
}

ListPedidos.getInitialProps = async ({ req }) => {
  const res4 = await fetch(`${baseApiBack}/pedidos`,{ method: "GET"});
  const dataPedido = await res4.json();
  return {dataPedido }
}



export default ListPedidos
