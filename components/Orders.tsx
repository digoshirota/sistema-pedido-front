import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { formatStringData } from '../helpers/helpers';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import { postPedido, getPedido } from '../services/pastel-service';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import { useEffect } from 'react';





function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Orders(props: any) {
  const router = useRouter();
  const [pedidoList, setPedidoList] = React.useState([]);
  const [shouldUpdate, setShouldUpdate] = React.useState(0);
  const [tableData,setTableData] = React.useState([]);

  const lastOrders = {
      sliced: router.pathname === '/pedidos' ? (shouldUpdate > 0 ?pedidoList: props.data) : (shouldUpdate > 0 ?pedidoList.slice(0, 5):props.data.slice(0, 5)),
  }
  const handleSubmit:any = (idPedido: any) => (e:any) => {
    e.preventDefault();
    let data ={
        id_pedido:idPedido,
        atendido: 1
    }
		let i = 0;
    if(data.id_pedido){
        postPedido(data).subscribe(
            data => {
              if(data.status === 'success') {
                getPedido().subscribe({
                  next: (v) => {setPedidoList(v);setShouldUpdate(i+1)},
                  error: (e) => console.error(e),
                  complete: () => console.info('complete') 
              })
              }
            },
            error => {
                
            }
        )
    }
    else{
     
    }
};
const handleRefresh:any = () => (e:any) => {
  e.preventDefault();
  console.log('aqui')
	let i = 0;
    getPedido().subscribe({
        next: (v) => {setPedidoList(v);setShouldUpdate(i+1)},
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
};
useEffect(() => {

  setInterval(() => {
		let i = 0;
    getPedido().subscribe({
			next: (v) => {setPedidoList(v);setShouldUpdate(i+1)},
			error: (e) => console.error(e),
			complete: () => console.info('complete') 
	})
  }, 5000);
}, []);
  return (
    <React.Fragment>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Title>Pedidos recentes</Title>
        <Button sx={{ marginLeft: 'auto'}} variant="contained" endIcon={<RefreshIcon />} onClick={handleRefresh()}>
                          Atualizar
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Pedido</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tabela-pedidos">
          {lastOrders.sliced.filter((x: { atendido: any; }) => (x.atendido)== 0).map((row:any,index:any) => (
      
            <TableRow key={row.id_pedido}>
              <TableCell>{formatStringData(row.date)}</TableCell>
              <TableCell>{row.nome_cliente}</TableCell>
              <TableCell>
                <TableBody className="table-lista-pedidos">
                  {row.lista_pedido.map((el:any,index:any) => (
                      
                        <TableRow key={el.index+el.name}>
                          <TableCell>{el.tipo}</TableCell>
                          <TableCell>{el.name}</TableCell>
                          <TableCell>{el.quantity}</TableCell>
                          
                        </TableRow>

                    
                    ))}
                 </TableBody>
              </TableCell>
              <TableCell align="right">{`R$ ${row.valor}`}</TableCell>
              <TableCell align="right">{row.atendido == 1?   <Button variant="contained" color="success">
                  Atendido
                </Button>:<Button variant="contained" color="error" onClick={handleSubmit(row.id_pedido)}>
                  Não Atendido
                </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
