import React, { useEffect, useRef } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
const { Fragment } = React;

interface linkProps {
    label: string;
    label2:string;
  
}

export default function AlertComponent(props: any)  {

    const [mensagem, setMensagem] = React.useState(false);
    const [mensagem2, setMensagem2] = React.useState('');
 



    const closeAlert = () => {
        
        setMensagem(true)
    };


    
   


    return (
       
        <Fragment>
                { props.mensagem &&<Alert  className={`alert-notif`} onClose={closeAlert} variant="filled" severity={"success"}><AlertTitle>Sucesso</AlertTitle>{props.label}</Alert>}
                { mensagem2 && <Alert className="alert-notif" onClose={() => {}} variant="filled" severity="error"><AlertTitle>Erro</AlertTitle>{props.label2}</Alert>}
        </Fragment>
    );
}

