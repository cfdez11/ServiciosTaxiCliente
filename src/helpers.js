//Obtenemos la semana a la que pertenece el dia que le pasamos
export const extraerSemana = (date) =>{
    const fecha = new Date(date);
    const diaaux = new Date (fecha.getFullYear(), fecha.getMonth(), 1);
    return Math.ceil((diaaux.getDay() - 1 + fecha.getDate()) / 7) ;

}

//Devuelve string con la fecha en formato de lectura natural 20-12-1999
export const extraerFechaCompleta = (date) =>{
    const fecha = new Date(date);
    // console.log(fecha);
    return (      fecha.getFullYear() + '-'
                + ('0' + (fecha.getMonth()+1)).slice(-2) + '-'
                + ('0' + fecha.getDate()).slice(-2)
            );

}

//Recibiendo un string 2019-12-20 lo convierte en un objeto fecha new Date()
const stringToFecha = (fecha) => {
    // console.log(`${fecha.substring(4,fecha.length)}-${fecha.substring(2,4)}-${fecha.substring(0,2)}`);
    return new Date(`${fecha.substring(4,fecha.length)}-${fecha.substring(2,4)}-${fecha.substring(0,2)}` );
}

//Obtiene el numero de servicios
export const numeroServicios = (serviciosmostrados) => {
    if(serviciosmostrados.length === 0 ) return ' ';
    return serviciosmostrados.length;
}

//Obtiene el numero medio de pasageros de los servicios
export const pasagerosMedio = (serviciosmostrados) => {
    const nservicios = serviciosmostrados.length;

    if(nservicios === 0) return ' ';

    let npasageros = 0;

    serviciosmostrados.forEach(servicio => {
        npasageros += servicio.pasageros;
    });

    const media = (npasageros / nservicios).toFixed(2);

    return media;
}

//La moda, el servicio mas solicitado
export const destinoMasSolicitado = (serviciosmostrados) => {
    
    let servicios = {};

    serviciosmostrados.forEach(servicio => {
        //Si no existe el objeto en la array, indexando por el nombre 
        //de destino , se introduce en el array
        if(!servicios[servicio.zona]){
            servicios[servicio.zona] = 1;
        }else{
            //ya existe el objeto en el arreglo, se incrementa en uno
            servicios[servicio.zona] += 1;
        }
        
    });

    //Devolver el servicio que mas repeticiones tiene
     let valormayor = 0;
     let valormayorkey = -Infinity;
     for (let key in servicios){
         const valor = servicios[key];
        if(valor>valormayor){
            valormayor= valor;
            valormayorkey=key;
         }
    }

    if(valormayorkey === -Infinity) return ' '
    return valormayorkey;
}

//Servicio que ha aportado un mayor ingreso
export const mayorIngreso = (serviciosmostrados) => {

    if(serviciosmostrados.length === 0) return ' ';

    let mayorIngreso = 0;
    let destinomayorIngreso = '';

    serviciosmostrados.forEach(servicio => {
        if(servicio.precio > mayorIngreso) {
            mayorIngreso = servicio.precio;
            destinomayorIngreso = servicio.zona;
        }
        
    });


    return mayorIngreso + ' '+ destinomayorIngreso;
}

//Obtiene el ingreso medio que se ha generado por servicio
export const ingresoMedio = (serviciosmostrados) => {
    const nservicios = serviciosmostrados.length;

    if(nservicios === 0) return ' ';

    let ingresototal = 0;

    serviciosmostrados.forEach(servicio => {
        ingresototal += servicio.precio;
    });

    const media = (ingresototal / nservicios).toFixed(2);
    
    return media;
}

//Obtiene la suma de los ingresos de cada servicio
export const ingresoTotal = (serviciosmostrados) => {
    const nservicios = serviciosmostrados.length;

    if(nservicios === 0) return ' ';

    let ingresototal = 0;

    serviciosmostrados.forEach(servicio => {
        ingresototal += servicio.precio;
    });

    return ingresototal;
}

//Recibiendo un documento en formato xml, captura todos los datos interesantes y
//los devuelve en un arreglo
export const exportServicios = async ( documento ) => {
    var XMLParser = require('react-xml-parser');

    const index = documento.indexOf("?>");
    let doc = documento.substring(index+2,documento.length);
    // console.log(doc);
    var xml = await new XMLParser().parseFromString(doc);    // Assume xmlText contains the example XML
    // console.log(xml.children);
    // console.log(xml.children[0].attributes);

    let listaservicios = xml.children;
    let servicios = [];

    listaservicios.forEach(servicio => {

        let servicioaux = {
            idservicio: servicio.attributes.NoParte,
            salida:  servicio.attributes.LugarPresentacion,
            cliente: servicio.attributes.Cliente ,
            ttoo: servicio.attributes.TTOO ,
            fecha: new Date(stringToFecha(servicio.attributes.Fecha)),
            horainicio: servicio.attributes.HoraInicio ,
            letreros: servicio.attributes.Letreros,
            conductor: servicio.attributes.Conductor,
            vehiculo: servicio.attributes.Vehiculo ,
            refvuelo: servicio.children[0].children[0].attributes.RefVuelo,
            horavuelo: servicio.children[0].children[0].attributes.Hora ,
            llegada: servicio.children[1].children[0].attributes.NombrePunto,
            minllegada: servicio.children[1].children[0].attributes.PuntoRecogida,
            zona: servicio.children[1].children[0].attributes.ZonaFisica,
            adultos: parseInt(servicio.children[1].children[0].attributes.Adultos),
            ninos: parseInt(servicio.children[1].children[0].attributes["Ni�os"]),
            precio: 10,
            observaciones: servicio.attributes.Observaciones,
            tipo: servicio.attributes.CodigoServicio,
            pasageros:  parseInt(servicio.children[1].children[0].attributes.Adultos,10) + 
                        parseInt(servicio.children[1].children[0].attributes["Ni�os"],10)
            
        }

        servicios.push(servicioaux);

    });

    // console.log(servicios);

    return servicios;

  };

//Dependiendo del grafico tenemos unas opciones u otras, por ello se han creado 3 funciones,
//se seleccionan con el switch de esta funcion.
export const extraeDatosGrafico = (opcion, servicios) => {

    switch(opcion){
        case 'Semana':
            return extraerDatosGraficoSemana(servicios);
        case 'Mes':
            return extraerDatosGraficoMes(servicios);
        case 'Año':
            return extraerDatosGraficoAno(servicios);
        default:
            return [];
    }   
}

//Devuelve el arreglo data, con los dias de la semana, sus ingresos por dia y n servicios del dia
const extraerDatosGraficoSemana = (servicios) => {
    const data  = [
        {
            name: 'Lunes',
            Ingresos: 0,
            Servicios: 0,

        },
        {
            name: 'Martes',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Miercoles',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Jueves',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Viernes',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Sabado',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Domingo',
            Ingresos: 0,
            Servicios: 0,
        }

    ];

    if(servicios.length === 0) return data;

    servicios.forEach(servicio => {
        let fechaservicio = new Date(servicio.fecha);
        let diasemana = fechaservicio.getDay() - 1;
        data[diasemana].Ingresos += servicio.precio;
        data[diasemana].Servicios += servicio.precio;
    });

    return data;

}


const extraerDatosGraficoMes = (servicios) => {
    const data  = [];

    if(servicios.length === 0) return [];

    for (let i=0; i<numeroDiasMes(servicios[0].fecha); i++){
        let dia = i + 1;
        data.push(
            {
                name: '' + dia,
                Ingresos: 0,
                Servicios: 0,
            } 
        );
    }

    // console.log(data);

    servicios.forEach(servicio => {
        // let semana = extraerSemana(servicio.fecha) - 1;
        let fecha = new Date(servicio.fecha);
        let dia = fecha.getDate();
        data[dia].Ingresos += servicio.precio;
        data[dia].Servicios += servicio.precio;
    });

    return data;

}

const extraerDatosGraficoAno = (servicios) => {
    const data  = [
        {
            name: 'Enero',
            Ingresos: 0,
            Servicios: 0,

        },
        {
            name: 'Febrero',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Marzo',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Abril',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Mayo',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Junio',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Julio',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Agosto',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Septiembre',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Octubre',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Noviembre',
            Ingresos: 0,
            Servicios: 0,
        },
        {
            name: 'Diciembre',
            Ingresos: 0,
            Servicios: 0,
        }
    ];

    if(servicios.length === 0) return data;

    servicios.forEach(servicio => {
        let fechaservicio = new Date(servicio.fecha);
        let mes = fechaservicio.getMonth();
        data[mes].Ingresos += servicio.precio;
        data[mes].Servicios += servicio.precio;
    });

    return data;
}

const numeroDiasMes = date => {
    const fechaaux = new Date(date);
    const fecha = new Date(fechaaux.getFullYear(), fechaaux.getMonth() + 1, 0);
    // console.log(fecha.getDate());
    return fecha.getDate();
}

