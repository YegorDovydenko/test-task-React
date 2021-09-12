import { useState } from "react";
import { Info } from "./components/Info";
import { Pagination } from "./components/Pagination";
import { TableHeader } from "./components/TableHeader";
import { Users } from "./components/Users";

const apiLink = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'

function App() {

  // Elements consts -------------------------------------------------
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState({})
  const [sortElemtns, setSortElemtns] = useState('down')

  // Pagination consts -----------------------------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(20)

  const submitInput = (event) => {
    if (event.key !== "Enter") {
      return
    }
    setUsers([])
    setSelectUser([])
    setCurrentPage(1)
    fetch(apiLink)
      .then((res) => res.json())
      .then((result) => {
        const newUsers = [];
        for (let value of result) {
          if (value.firstName.includes(event.target.value)) {
            newUsers.push(value);
          }
        }
        setUsers((pv) => [...pv, ...newUsers])
      })
  }

  const chooseUser = (event) => {
    event.preventDefault()
    users.map(user => (
      +event.currentTarget.id === +user.id ? setSelectUser(user) : null
    ))
  }

  // Sorted functions ------------------------------------------------

  const sortById = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortIdDown'

      users.sort((a,b) => {return a.id - b.id})
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortIdUp'

      users.sort((a,b) => {return b.id - a.id})
    }
  }

  const sortByFirstName = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortFirstNameDown'
      users.sort((a, b) => {
        if (a.firstName > b.firstName) {return 1}
        else if (a.firstName < b.firstName) {return -1}
        return 0
      })
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortFirstNameUp'

      users.sort((a, b) => {
        if (a.firstName > b.firstName) {return -1}
        else if (a.firstName < b.firstName) {return 1}
        return 0
      })
    }
  }

  const sortByLastName = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortLastNameDown'
      users.sort((a, b) => {
        if (a.lastName > b.lastName) {return 1}
        else if (a.lastName < b.lastName) {return -1}
        return 0
      })
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortLastNameUp'

      users.sort((a, b) => {
        if (a.lastName > b.lastName) {return -1}
        else if (a.lastName < b.lastName) {return 1}
        return 0
      })
    }
  }

  const sortByEmail = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortEmailDown'
      users.sort((a, b) => {
        if (a.email > b.email) {return 1}
        else if (a.email < b.email) {return -1}
        return 0
      })
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortEmailUp'

      users.sort((a, b) => {
        if (a.email > b.email) {return -1}
        else if (a.email < b.email) {return 1}
        return 0;
      })
    }
  }

  const sortByPhone = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortPhoneDown'

      users.sort((a,b) => {
        return a.phone.replace(/\D/g, '') - b.phone.replace(/\D/g, '')
      })
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortPhoneUp'

      users.sort((a,b) => {
        return b.phone.replace(/\D/g, '') - a.phone.replace(/\D/g, '')
      })
    }
  }

  const sortByState = (event) => {
    event.preventDefault()

    if(sortElemtns === 'down'){  
      setSortElemtns('up')
      event.currentTarget.id = 'sortStateDown'
      users.sort((a, b) => {
        if (a.adress.state > b.adress.state) {return 1}
        else if (a.adress.state < b.adress.state) {return -1}
        return 0
      })
    }
    else{
      setSortElemtns('down')
      event.currentTarget.id = 'sortStateUp'

      users.sort((a, b) => {
        if (a.adress.state > b.adress.state) {return -1}
        else if (a.adress.state < b.adress.state) {return 1}
        return 0
      })
    }
  }

  // Pagination functions --------------------------------------------

  const lastUsersPage = currentPage * usersPerPage
  const firstUsersPage = lastUsersPage - usersPerPage
  const currentUsersPage = users.slice(firstUsersPage, lastUsersPage)

  const paginate = (pageNumber) => {setCurrentPage(pageNumber)}
  const nextPage = () => setCurrentPage(pv => pv + 1)
  const prevPage = () => setCurrentPage(pv => pv - 1)


  return(
    <>
      <input type="text" placeholder="Name search" onKeyPress={submitInput}/>
      {
        users.length === 0
        ?
        <p>Let's started</p>
        :
        <div className="main">
          <div className="paginationNav">
            <Pagination 
              usersPerPage={usersPerPage} 
              allElements={users.length}
              paginate={paginate}
            />
            {
              users.length > usersPerPage
              ?
              <>
                <button onClick={prevPage}>Prev</button>
                <button onClick={nextPage}>Next</button>
              </>
              :
              null
            }
          </div>
          <table>
            <tbody>
              <TableHeader 
                sortById={sortById}
                sortByFirstName={sortByFirstName} 
                sortByLastName={sortByLastName} 
                sortByEmail={sortByEmail} 
                sortByPhone={sortByPhone} 
                sortByState={sortByState} 
              />
              <Users 
                users={currentUsersPage} 
                chooseUser={chooseUser}/>
            </tbody>
          </table>
        </div>
      }
      {selectUser.id !== undefined 
        ?
        <Info user={selectUser}/>
        :
        null
      }
  </>
  )
}

export default App;
