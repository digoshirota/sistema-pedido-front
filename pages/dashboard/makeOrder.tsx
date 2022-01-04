import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import CreateOrder from './createOrder';
import ThemeContext from '../context/orderContext';
import { formatNumberToReal } from '../../helpers/helpers';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}




export default function MakeOrders(props: any) {
    const [value, setValue] = React.useState({ username: '1', age: '2' });
    const [listPedido, setListPedido] = React.useState<any>([]);
    const sendDataToParent = (index: any) => {
        const item = index;
        setListPedido([...listPedido, item]);
    };



    return (
        <React.Fragment>
            <Title>Pedidos</Title>

            <ThemeContext.Provider value={value}>

                <CreateOrder data={props.data[0]} sendDataToParent={sendDataToParent} label={'Pastel'} />
                <CreateOrder data={props.data[1]} sendDataToParent={sendDataToParent} displayClient={false} label={'Salgado'} />
                <CreateOrder data={props.data[2]} sendDataToParent={sendDataToParent} displayClient={false} label={'Bebida'} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Adicional</TableCell>
                            <TableCell align="right">Observação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPedido.map((row: any, index: any) => (
                            <TableRow key={row.name + index}>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{formatNumberToReal(row.valor)}</TableCell>
                                <TableCell>{formatNumberToReal(row.adicional)}</TableCell>
                                <TableCell align="right">{`${row.obs}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="total">
                    <FormControl >
                        <InputLabel htmlFor="total">Valor Total</InputLabel>
                        <OutlinedInput
                            id="total"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            label="Valor Total"
                            value={listPedido.reduce(function (acc: any, obj: { valor: any; }) { return acc + obj.valor; }, 0)}
                        />
                    </FormControl>
                </div>
            </ThemeContext.Provider >
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}
