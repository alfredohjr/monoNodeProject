import http from 'http';

export function Auth(req, res, next){

    console.log("Olá");

    const request = http.get({
        hostname : "localhost",
        port : 3001,
        path : "/",
        method : "GET"
    }, r => {
        const statuscode = r.statusCode;

        if(statuscode === 200) {
            console.log('auth está online')
            next();
        } else {
            throw new Error('auth está ligado, mas apresentando codigo diferente de 200, verifique!');       
        }
    });

    request.on('error',(req) => {
        console.log("deu boa não");
        res.status(500).json({
            error : 'Servidor de auth pode estar desligado, verifique'
        });
    });

    request.end();

};