let redis = require('redis');
let express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
let port = 4040;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

let redisClient = redis.createClient(6379, "redis"); 

app.set('port', port);


app.listen(app.get('port'), (err) =>{
    console.log(`Server running on port ${app.get('port')}`);
})


redisClient.on('connect', () =>{
    console.log('Conectado a Redis Server.');
})

redisClient.on('error', (err) =>{
    console.log(err);
})


redisClient.geoadd("cervecerias", -32.480575, -58.2361143, "Drakkar", -32.4799457, -58.2375203, "7 colinas")
redisClient.geoadd("facultades", -32.479084, -58.2356481, "UADER FCYT", -32.4958, -58.2318001, "UTN")
redisClient.geoadd("farmacias", -32.4778867, -58.2398107, "Farmacia Yrigoyen", -32.4862046, -58.2352914, "Farmacia Alberdi")
redisClient.geoadd("centro de salud", -32.4814682, -58.2629496, "Hospital Urquiza", -32.4834698, -58.2323863, "Clínica Uruguay")
redisClient.geoadd("supermercados", -32.4891777, -58.2324794, "Gran Rex", -32.4862602, -58.2348169, "Supremo")

redisClient.georadius("cervecerias", -32.479371, -58.231429, 5, "km",(err, values) =>{
    console.log(values)
})


redisClient.georadius("facultades", -32.479371, -58.231429, 5, "km", (err, values) =>{
    console.log(values)
})

app.post('/cargar', (req, res, next)=>{
    try{
        const { grupoInteres, lugar, latitud, longitud} = req.body;

        redisClient.geoadd(grupoInteres, latitud, longitud, lugar)

        res.send("Lugar de interes cargado.")

    } catch (err){
        next(err);
    }
}) 

app.get('/distancia/:grupoInteres/:latitud/:longitud',(req, res, next)=>{
    try{
        const { grupoInteres, latitud, longitud } = req.params;
        //const gruposInt = ["cervecerias", "facultades", "farmacias", "centro de salud", "supermercados"]
        redisClient.georadius(grupoInteres, latitud, longitud, 5, "km", "withdist", (err,values)=>{
            res.send(JSON.stringify(values))
        })
            
        
    } catch(err){
        next(err)
    }
})