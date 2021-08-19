import React, { useEffect, useState } from 'react'
import DeudasTable from '../components/DeudasTable';
import Search from '../components/Search';
import { helpHttp } from '../helpers/helpHttp';

const DeudaClientes = () => {

    const [db, setDb] = useState(null);
    const [filterData, setFilterData] = useState(null)

    let url = "http://localhost:9000/mostrarDeudas"

    useEffect(() => {

        let options = {
            headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJub21icmUiOiJKb2FxdWluIn0sImlhdCI6MTYyOTMyNjQ1M30.KX-gkJ38MCNAY04WethbzWV9_4A39tb57VrHy-M8mHI" }
        }

        helpHttp().get(url, options).then((res) => {
            if (!res.err) {
                setDb(res);
                setFilterData(res)
            } else {
                setDb(null)
            }
        })
    }, [url])

    const filtrarTableCliente = (search) => {
        setFilterData(db);

        let buscar= filterData.filter((el)=>{
            if (el.idCliente.includes(search.idCliente)) {
                return el;
            }
        })

        if (buscar.length === 0) {
            setFilterData(db)
        }else{

            setFilterData(buscar)
        }
        
    }

    const filtrarTableDate = (search) => {
        setFilterData(db);

        let buscar= filterData.filter((el)=>{
            if (el.fechaVencimiento.includes(search.fechaVencimiento)) {
                return el;
            }else{
                console.log(search)
            }
        })

        if (buscar.length === 0) {
            setFilterData(db)
        }else{

            setFilterData(buscar)
        }
        
    }


    return (
        <div>
            <br />
            <Search filtrarTableCliente={filtrarTableCliente} filtrarTableDate={filtrarTableDate}/>
            <br />
            <button type="button" className="btn btn-primary" onClick={()=> setFilterData(db)}>Limpiar</button>

            {filterData && <DeudasTable data={filterData} />}
        </div>
    )
}

export default DeudaClientes
