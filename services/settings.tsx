
export const baseApi = 'https://statusinvest.com.br';
export const baseApi2 = 'https://br.investing.com';
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = () => process.env.isTesting === 'true';
let ApiBack: string = "";

if (isProd) {
    ApiBack = 'http://15.229.9.243:3333';
    // ApiBack = 'http://localhost:3333';
}
else {
    //ApiBack = 'https://r3investimentos.com.br';
    ApiBack = 'http://localhost:3333';
}


export const baseApiBack = ApiBack;