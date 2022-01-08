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
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';
import {postPedido} from '../../services/pastel-service'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const columns = [
    { field: 'Tipo' },
    { field: 'Item' },
    { field: 'Quantidade' },
    { field: 'Valor' },
    { field: 'Adicional' },
];



export default function MakeOrders(props: any) {
    const [value, setValue] = React.useState({ username: '1', age: '2' });
    const [listPedido, setListPedido] = React.useState<any>([]);
    const [nomeCLiente, setNomeCLiente] = React.useState('');
    const [mensagem, setMensagem] = React.useState(false);
    const resetFields = () =>{
        setListPedido([]);
        setNomeCLiente('');
    }
    const sendDataToParent = (index: any) => {
        const item = index;
        setListPedido([...listPedido, item]);
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        let data ={
            nome_cliente: nomeCLiente,
            lista_pedido: listPedido
        }
        postPedido(data).subscribe(
            data => {
              console.log(data)
              if(data.status === 'success') {
                setMensagem(true);
                resetFields();
                setTimeout(() => {
                    setMensagem(false);
                    
                  }, 3000);
              }
            },
            error => {
                console.log(error)
            }
        )
    };
    const handleNomeCLiente = (event: any) => {
        setNomeCLiente(event.target.value);
    };



    return (
        <React.Fragment>
            <Title>Pedidos</Title>

            <ThemeContext.Provider value={value}>
                <TextField id="client-name" label="Nome do cliente" required sx={{ mb: 3 }} value={nomeCLiente} onChange={handleNomeCLiente}/>  
                <CreateOrder data={props.data[0]} sendDataToParent={sendDataToParent} label={'Pastel'} />
                <CreateOrder data={props.data[1]} sendDataToParent={sendDataToParent} label={'Salgado'} />
                <CreateOrder data={props.data[2]} sendDataToParent={sendDataToParent} label={'Bebida'} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((row: any, index: any) => (
                                <TableCell>{row.field}</TableCell>
                            ))}
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
                            value={listPedido.reduce(function (acc: any, obj: { valor: any; adicional: any }) { return acc + obj.valor + (obj.adicional ? obj.adicional : 0); }, 0)}
                        />
                    </FormControl>
                </div>
                <div className="fechar-pedido">
                    <Button variant="contained" endIcon={<SaveIcon />} onClick={handleSubmit}>
                        Fechar pedido
                    </Button>
                </div>
                { mensagem && <Alert className="alert-notif" onClose={() => {}} variant="filled" severity="success"><AlertTitle>Sucesso</AlertTitle>Pedido Salvo!</Alert>}
            </ThemeContext.Provider >
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}
