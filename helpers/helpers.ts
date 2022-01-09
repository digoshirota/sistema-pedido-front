export const formatNumberToReal: any = (num: any) => {
    if (num) {
        if (num.toString().length > 6 && (num >= 1000000 || num <= -1000000)) {
            let x = (num / 1000000).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            return (x + ' M')
        }
        else {
            return (num).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });


        }
    }
}

export const formatStringToNumber: any = (num: any) => {
    return parseFloat(num)
}

export const formatStringData: any = (num: any) => {
    return new Date(num).toLocaleDateString('pt-BR') + ' '+ new Date(num).toLocaleTimeString();
}



