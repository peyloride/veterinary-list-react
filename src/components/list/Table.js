import React from 'react';
import './Table.css';

const Table = (props) => {
    const { history, vets } = props;

    return (
        <div className="vets">
          <table className="Table">
            <thead className="Table-head">
              <tr>
                <th>İsim</th>
                <th>Adres</th>
                <th>İl</th>
                <th>İlçe</th>
                <th>Telefon</th>
                <th>Websitesi</th>
              </tr>
            </thead>
            <tbody className="Table-body">
              {vets.map(vet =>
                <tr
                  key={vet.id}
                >
                  <td>
                    {vet.name}
                  </td>
                  <td>
                    {vet.address}
                  </td>
                  <td>
                    {vet.city}
                  </td>
                  <td>
                    {vet.town}
                  </td>
                  <td>
                    {vet.telephone}
                  </td>
                  <td>
                    {vet.website}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
    );
}

export default Table;