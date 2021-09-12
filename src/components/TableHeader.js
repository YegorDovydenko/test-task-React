import sortTr from '.././tr.png'

export const TableHeader = ({sortById, sortByFirstName, sortByLastName, sortByEmail, sortByPhone, sortByState}) => {
    return(
        <tr>
                  <th className="firstRow" onClick={sortById} id="sortId">
                    <div>
                      <h3>Id</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                  <th className="firstRow" onClick={sortByFirstName} id="sortFirstName">
                    <div>
                      <h3>First name</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                  <th className="firstRow" onClick={sortByLastName} id="sortLastName">
                    <div>
                      <h3>Last name</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                  <th className="firstRow" onClick={sortByEmail} id="sortEmail">
                    <div>
                      <h3>Email</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                  <th className="firstRow" onClick={sortByPhone} id="sortPhone">
                    <div>
                      <h3>Phone</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                  <th className="firstRow" onClick={sortByState} id="sortState">
                    <div>
                      <h3>State</h3>
                      <img src={sortTr} alt="sort"/>
                    </div>
                  </th>
                </tr>
    )
}