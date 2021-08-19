import React from 'react'
import DeudasTableRow from './DeudasTableRow'

const DeudasTable = ({data}) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Cliente</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">ID Deuda</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? 
                            data.map((el,index)=> <DeudasTableRow key={index} el={el}/>)
                        :<tr><td colSpan="2"> Sin Datos</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DeudasTable
