import * as React from 'react';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { formatNumberToReal, formatStringToNumber } from '../../helpers/helpers';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ThemeContext from '../context/orderContext'



function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export interface Ipastel {
    valor: string;
    nome: string;
}


export default function CreateOrder(props: any) {
    const [value, setValue] = React.useState<Ipastel>({ valor: '', nome: '' });
    const [inputValue, setInputValue] = React.useState('');

    const [valueReal, setValueReal] = React.useState({ valor: '', nome: '' });
    const [inputValueReal, setInputValueReal] = React.useState({ valor: '', nome: '' });

    const [textQuantity, setQuantity] = useState(1);
    const [textValor, setValor] = useState('');
    const [textAdicional, setAdicional] = useState('');
    const [textObs, setObs] = useState('');
    const [textTipo, setTipo] = useState(props.label);
    const [sendData, setSendData] = useState({ name: '', quantity: 1, adicional: '', obs: '', valor: '' });

    const handleTextsetQuantity = (event: any) => {
        setQuantity(event.target.value);
    };
    const handleTextsetValor = (event: any) => {
        setValor(event.target.value);
    };
    const handleTextsetAdicional = (event: any) => {
        setAdicional(event.target.value);
    };
    const handleTextsetObs = (event: any) => {
        setObs(event.target.value);
    };
    const handleTextsetTipo = (event: any) => {
        setTipo(event.target.value);
    };

    const handleSubmit = (event: any) => {
        if (value.nome) {
            props.sendDataToParent({ name: value.nome, quantity: textQuantity, adicional: formatStringToNumber(textAdicional), obs: textObs, valor: valueReal.valor * textQuantity, tipo: textTipo });
            setQuantity(1);
            setValor('');
            setAdicional('');
            setObs('');
            setValue({ valor: '', nome: '' });
            setValueReal({ valor: '', nome: '' });
        }
        event.preventDefault();
    };
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                {props.displayClient == false ? null : <TextField id="client-name" label="Nome do cliente" required sx={{ mb: 3 }} />}
                <TextField id="tipo" sx={{ display: 'none' }} onChange={handleTextsetTipo} value={textTipo} />
                <Grid container sx={{ mb: 3 }} spacing={3}>
                    <Grid item xs={3}>
                        <Stack>
                            <Autocomplete
                                freeSolo
                                id={"select" + props.label}
                                value={value || ''}
                                onChange={(event, newValue: any) => {
                                    setValue(newValue);
                                    setValueReal(newValue);

                                }}
                                disableClearable
                                options={props.data}
                                getOptionLabel={(option: any) => option.nome || ""}
                                // getOptionLabel={props.data.map((option: any) => option.nome)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={props.label}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={1}>
                        <TextField id="quantity" label="Quantidade" onChange={handleTextsetQuantity} value={textQuantity} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="valor" label="Valor" value={formatNumberToReal(valueReal.valor * textQuantity) || ''} onChange={handleTextsetValor} />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="outlined-adornment-adicional">adicional</InputLabel>
                            <OutlinedInput
                                id="adicional"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                label="adicional"
                                onChange={handleTextsetAdicional}
                                value={textAdicional}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="obs" label="observação" sx={{ width: '100%' }} onChange={handleTextsetObs} value={textObs} />
                    </Grid>
                    <Grid item xs={3}>
                        <Button type="submit" color="success" variant="contained" endIcon={<AddIcon />}>
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}





