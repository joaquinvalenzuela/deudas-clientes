import React, { useState } from 'react'



const Search = ({filtrarTableCliente,filtrarTableDate}) => {

    const [search, setSearch] = useState("");

    const handleChange =(e)=>{
        setSearch({
            ...search ,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="row">
            <div className="col">

                <input type="text" className="form-control" placeholder="Barra de busqueda" name="idCliente" onChange={handleChange} value={search.name}/>


            </div>
            <div className="col">
                <button type="button" className="btn btn-primary" onClick={()=>filtrarTableCliente(search)}>Buscar</button>
            </div>
            <div className="col">

                <input type="text" className="form-control" placeholder="Barra de busqueda" name="fechaVencimiento" onChange={handleChange} value={search.name}/>

        
            </div>
            <div className="col">
                <button type="button" className="btn btn-primary" onClick={()=>filtrarTableDate(search)}>Buscar</button>
            </div>
        </div>
    )
}

export default Search
