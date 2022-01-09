import React from 'react';
import { useRouter } from 'next/router'
import ListItemText from '@mui/material/ListItemText';

const { Fragment } = React;

interface linkProps {
    href: any;
    children: any;
    strong?: any;
}

const ActiveLink: React.FC<linkProps> = ({ children, href, strong }) => {
    const router = useRouter()
    const style = {
        color: router.pathname === href ? 'blue' : 'black',
      }


    const handleClick = (e:any) => {
        e.preventDefault()
        router.push(href)
        console.log(router)
    }
    return (
        <Fragment>
            {
                strong ?
                    <a href={href} onClick={handleClick} style={style}>
                        <strong><ListItemText primary={children} /></strong>
                    </a> :
                    <a href={href} onClick={handleClick} style={style}>
                        <ListItemText primary={children} />
                    </a>
            }
        </Fragment>
    );
}

export default ActiveLink;