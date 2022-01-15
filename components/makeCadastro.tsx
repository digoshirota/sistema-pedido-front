import * as React from 'react';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { formatNumberToReal } from '../helpers/helpers';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { postCadastro, getPastel,deleteCadastro, getSalgado,getBebida } from '../services/pastel-service';
import AlertComponent from './alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export interface Ipastel {
    valor: string;
    nome: string;
}

const columns = [
    { field: 'ID' },
    { field: 'Nome' },
    { field: 'Valor' },
    { field: 'Ações', align: 'right' },

];


export default function MakeCadastro(props: any) {
    const [textNome, setNome] = useState('');
    const [textValor, setValor] = useState(0);
    const [id, setID] = useState(0);
    const [mensagem, setMensagem] = useState('');
    const [gatilho, setGatilho] = useState(false);
    const [listPedido, setlistPedido] = useState(props.data);
    const [editar, setEditar] = useState(false);
    const [deletar, setDeletar] = useState(false);
    const [indexRow, setIndexRow] = useState(1);
    const categoriaRef: any = useRef('')
    const categoriaRef2: any = useRef('')


    const handleTextsetNome = (event: any) => {
        setNome(event.target.value);
    };
    const handleTextsetValor = (event: any) => {
        setValor(event.target.value);
    };
    const handleTextId = (event: any) => {
        setID(event.target.value);
    };

    const reset = () => {
        setValor(0);
        setNome('');
        setEditar(false);
        setNome('');
        setValor(0);
        setID(0);
       
        setTimeout(() => {
            setMensagem('')
        }, 3000)
        setTimeout(() => {
            setGatilho(false)
        }, 3000)
        setEditar(false)
        setDeletar(false)
    };

    function callSave(data: any) {
        setMensagem('Salvo com sucesso');
        setGatilho(true);
        postCadastro(data).subscribe({
            next: (v) => {
                console.log(v);
               if(v.category == 'pastel'){
                   getPastel().subscribe({
                       next: (v2) => { setlistPedido(v2);reset() },
                       error: (e2) => console.error(e2),
                       complete: () => {
                           
                       }
                   })
               }
               if(v.category == 'salgado'){
                getSalgado().subscribe({
                    next: (v2) => { setlistPedido(v2);reset() },
                    error: (e2) => console.error(e2),
                    complete: () => {
                        
                    }
                })
            }
            if(v.category == 'bebida'){
                getBebida().subscribe({
                    next: (v2) => { setlistPedido(v2);reset() },
                    error: (e2) => console.error(e2),
                    complete: () => {
                        
                    }
                })
            }
            },
            error: (e) => console.error(e),
            complete: () => console.info('complete')
        })
    }
    function callDelete(data: any) {
        setMensagem('Deletado com sucesso');
        setGatilho(true);
        deleteCadastro(data).subscribe({
            next: (v) => {
               
                getPastel().subscribe({
                    next: (v2) => { setlistPedido(v2);reset() },
                    error: (e2) => console.error(e2),
                    complete: () => {
                        getPastel
                    }
                })
            },
            error: (e) => console.error(e),
            complete: () => console.info('complete')
        })
    }

    function postData(tipo: any, dataList?: any) {
        let data = {
            categoria: categoriaRef.current.value,
            nome: textNome,
            valor: textValor
        }
        tipo == 'salvar' ? callSave(data) : null;
        tipo == 'edit' ? callSave(dataList) : null;
    }


    const handleSubmit: any = (tipo: any) => (e: any) => {
        e.preventDefault();
        if(e.target.dataset.row){
            var dados = JSON.parse(e.target.dataset.row);
        }
        switch (tipo) {
            case 'salvar':
                postData('salvar');
                break;
            case 'edit':
                setEditar(true);
                setNome(dados.nome);
                setValor(dados.valor);
                setID(dados.id_pastel);

                break;
            case 'delete':
                setEditar(true);
                setNome(dados.nome);
                setValor(dados.valor);
                setID(dados.id_pastel);
                setDeletar(true)

                break;

        }



    };
    const handleEdit: any = (e:any) => {
        e.preventDefault();
        let data = {
            categoria: categoriaRef2.current.value,
            nome: textNome,
            valor: textValor,
            id_produto: id
        }
        callSave(data);
    };
    const handleDelete: any = (e:any) => {
        e.preventDefault();
        let data = {
            categoria: categoriaRef2.current.value,
            id_produto: id
        }
        callDelete(data);
    };


    

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit('salvar')}>
                {!editar ? <Grid container sx={{ mb: 3 }} spacing={3}>
                    <Grid item xs={3}>
                        <TextField id="nome" label="Tipo" value={props.label} inputRef={categoriaRef} disabled required />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="nome" label="Nome" onChange={handleTextsetNome} value={textNome} required />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="valor" label="Valor" value={textValor} onChange={handleTextsetValor} required />
                    </Grid>

                    <Grid item xs={3}>
                        <Button type="submit" color="success" variant="contained" endIcon={<AddIcon />}>
                            Adicionar
                        </Button>
                    </Grid>
                    
                </Grid> : null}
             </form>
                {editar ?<Grid container sx={{ mb: 3 }} spacing={3}>
                
                    <Grid item xs={3}>
                        <TextField id="nome" label="Tipo" value={'pastel'} inputRef={categoriaRef2} disabled required />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="id" label="ID" onChange={handleTextId} value={id} required disabled/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="nome" label="Nome" onChange={handleTextsetNome} value={textNome} required disabled={deletar}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="valor" label="Valor" value={textValor} onChange={handleTextsetValor} required disabled={deletar}/>
                    </Grid>
                    {deletar ?
                    <Grid item xs={3}>
                        <Button color="error" onClick={handleDelete} variant="contained" endIcon={<DeleteIcon />}>
                            Deletar item
                        </Button>
                    </Grid>
                    : <Grid item xs={3}>
                    <Button onClick={handleEdit} variant="contained" endIcon={<EditIcon />}>
                        Salvar Edição
                    </Button>
                </Grid>}
                    
                </Grid>    : null}
                

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((row: any, index: any) => (
                                <TableCell align={row.align} key={row.field + index}>{row.field}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPedido.map((row: any, index: any) => (


                            <TableRow key={row.nome + index}>
                                <TableCell>{row.id_pastel}</TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{formatNumberToReal(row.valor)}</TableCell>
                                <TableCell align="right">
                                    <Button data-row={JSON.stringify({ id_pastel: row.id_pastel, nome: row.nome, valor: row.valor })} sx={{ marginRight: 3 }} variant="contained" endIcon={<EditIcon />} onClick={handleSubmit('edit')}>
                                        Editar
                                    </Button><Button data-row={JSON.stringify({ id_pastel: row.id_pastel, nome: row.nome, valor: row.valor })} color="error" variant="contained" endIcon={<DeleteIcon />} onClick={handleSubmit('delete')}>
                                        Deletar
                                    </Button></TableCell>

                            </TableRow>



                        ))}
                    </TableBody>
                </Table>
                <AlertComponent label={mensagem} mensagem={gatilho} />
           
        </React.Fragment>
    );
}





