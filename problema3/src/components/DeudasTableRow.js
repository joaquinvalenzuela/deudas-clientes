import React from 'react'

const DeudasTableRow = ({el}) => {

    let {idCliente , nombre , correo , idDeuda , monto , fechaVencimiento} = el ;

    let newDate =fechaVencimiento.split("T")[0];

    return (
        <tr>
            <td>{idCliente}</td>
            <td>{nombre}</td>
            <td>{correo}</td>
            <td>{idDeuda}</td>
            <td>{monto}</td>
            <td>{newDate}</td>
        </tr>
    )
}

export default DeudasTableRow
