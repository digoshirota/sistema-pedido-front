import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';






function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


export default function Orders(props: any) {
  console.log(props.data)
  return (
    <React.Fragment>
      <Title>Pedidos recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Pedido</TableCell>
            <TableCell align="right">Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row:any) => (
            <TableRow key={row.id_pedido}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.nome_cliente}</TableCell>
              <TableCell>
              {row.lista_pedido.map((el:any,index:any) => (
                  <TableBody>
                    <TableRow key={el.index+el.name}>
                      <TableCell>{el.tipo}</TableCell>
                      <TableCell>{el.name}</TableCell>
                      <TableCell>{el.quantity}</TableCell>
                      
                    </TableRow>

                  </TableBody>
                ))}
              </TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
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
