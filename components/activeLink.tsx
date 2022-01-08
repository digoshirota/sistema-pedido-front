import React from 'react';
import { useRouter } from 'next/router'


const { Fragment } = React;

interface linkProps {
    href: any;
    children: any;
    strong?: any;
}

const ActiveLink: React.FC<linkProps> = ({ children, href, strong }) => {
    const router = useRouter()
    const style = {
        marginRight: 10,
        color: router.pathname === href ? '#FF4056' : '#fff',
    }


    const handleClick = (e:any) => {
        e.preventDefault()
        router.push(href)
    }
    return (
        <Fragment>
            {
                strong ?
                    <a href={href} onClick={handleClick} style={style}>
                        <strong>{children}</strong>
                    </a> :
                    <a href={href} onClick={handleClick} style={style}>
                        {children}
                    </a>
            }
        </Fragment>
    );
}

export default ActiveLink;