const domain = process.env.NODE_ENV === 'production' ?
    'http://xquant.ai:1337' :
    'http://127.0.0.1:1337';

export const rootApi = domain;

export const rootImg = domain;