export const Users = ({users, chooseUser}) => {
    return(
    users.map((user, key) => (
        <tr key={key} onClick={chooseUser} id={user.id}>
          <th>
            {user.id}
          </th>
          <th>
            {user.firstName}
          </th>
          <th>
            {user.lastName}
          </th>
          <th>
            {user.email}
          </th>
          <th>
            {user.phone}
          </th>
          <th>
            {user.adress.state}
          </th>
        </tr>
      ))
    )
}