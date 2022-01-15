import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import CreateOrder from './createOrder';
import ThemeContext from '../../context/orderContext';
import { formatNumberToReal } from '../../../helpers/helpers';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';
import {postPedido} from '../../../services/pastel-service'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRef } from 'react';


const columns = [
    { field: 'Tipo' },
    { field: 'Item' },
    { field: 'Quantidade' },
    { field: 'Valor' },
    { field: 'Adicional' },
    { field: 'Observação' },
];



export default function MakeOrders(props: any) {
    const [value, setValue] = React.useState({ username: '1', age: '2' });
    const [listPedido, setListPedido] = React.useState<any>([]);
    const [nomeCLiente, setNomeCLiente] = React.useState('');
    const [mensagem, setMensagem] = React.useState(false);
    const [mensagem2, setMensagem2] = React.useState('');
    const [valorTotal, setvalorTotal] = React.useState('');
    const valueRef:any = useRef('')
    
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
            lista_pedido: JSON.stringify(listPedido),
            valor_total: valueRef.current.value,
            date: new Date(),
            atendido: 0
        }
        
        if(data.nome_cliente){
            postPedido(data).subscribe(
                data2 => {
           
                  if(data2.status === 'success') {
                    setMensagem(true);
                    resetFields();
                    props.retornaCallBack(data);
                    setTimeout(() => {
                        setMensagem(false);
                        
                      }, 3000);
                  }
                },
                error => {
                    setMensagem2('erro ao salvar')
                    setTimeout(() => {
                        setMensagem2('');
                        
                      }, 3000);
                    console.log(error)
                }
            )
        }
        else{
            setMensagem2('Preencher formulario')
            setTimeout(() => {
                setMensagem2('');
                
              }, 3000);
        }
    };
    const handleNomeCLiente = (event: any) => {
        setNomeCLiente(event.target.value);
    };
    const handleTextsetValorTotal= (event: any) => {
        console.log(event)
        setvalorTotal(event.target.value);
    };
  
   



    return (
        <React.Fragment>
            <Title>Pedidos</Title>

            <ThemeContext.Provider value={value}>
                <TextField id="client-name" label="Nome do cliente" required sx={{ mb: 3, marginBottom:7   }} value={nomeCLiente} onChange={handleNomeCLiente}/>  
                <CreateOrder data={props.data[0]} sendDataToParent={sendDataToParent} label={'Pastel'} />
                <CreateOrder data={props.data[1]} sendDataToParent={sendDataToParent} label={'Salgado'} />
                <CreateOrder data={props.data[2]} sendDataToParent={sendDataToParent} label={'Bebida'} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((row: any, index: any) => (
                                <TableCell key={row.field + index}>{row.field}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPedido.reverse().map((row: any, index: any) => (
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
                            inputRef={valueRef} 
                            value={parseFloat(listPedido.reduce(function (acc: any, obj: { valor: any; adicional: any }) { return acc + obj.valor + (obj.adicional ? obj.adicional : 0); }, 0))}
                        />
                    </FormControl>
                </div>
                <div className="fechar-pedido">
                    <Button variant="contained" endIcon={<SaveIcon />} onClick={handleSubmit}>
                        Fechar pedido
                    </Button>
                </div>
                { mensagem && <Alert className="alert-notif" onClose={() => {}} variant="filled" severity="success"><AlertTitle>Sucesso</AlertTitle>Pedido Salvo!</Alert>}
                { mensagem2 && <Alert className="alert-notif" onClose={() => {}} variant="filled" severity="error"><AlertTitle>Erro</AlertTitle>{mensagem2}</Alert>}
            </ThemeContext.Provider >
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}
