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
  const [stateCount, setStateCount] = useState([])

  const submitInput = (event) => {
    setUsers([])
    setSelectUser([])
    setCurrentPage(1)
    fetch(apiLink)
      .then((res) => res.json())
      .then((result) => {
        const newUsers = [];
        for (let value of result) {
          if (value.firstName.includes(event.target.value)) {
            newUsers.push(value)
            setStateCount(pv => [...pv, value.adress.state])
          }
        }
        setUsers((pv) => [...pv, ...newUsers])
      })
      console.log(stateCount)
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

  const selectByState = (event) => {
    setUsers([])
    setSelectUser([])
    setCurrentPage(1)
    fetch(apiLink)
      .then((res) => res.json())
      .then((result) => {
        const newUsers = [];
        for (let value of result) {
          if (value.adress.state.includes(event.target.value)) {
            newUsers.push(value);
          }
        }
        setUsers((pv) => [...pv, ...newUsers])
      })
  }

  // Pagination functions --------------------------------------------

  const lastUsersPage = currentPage * usersPerPage
  const firstUsersPage = lastUsersPage - usersPerPage
  const currentUsersPage = users.slice(firstUsersPage, lastUsersPage)
  const pages = Math.ceil(users.length / usersPerPage)

  const paginate = (pageNumber) => {setCurrentPage(pageNumber)}

  return(
    <>
      <input type="text" placeholder="Name search" onChange={submitInput}/>
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
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="stateSelect">
            <h3>Filter by State</h3>
            <select onChange={selectByState}>
              {
                [...new Set(stateCount)]
                  .sort((a, b) => {
                    if (a> b) {return 1}
                    else if (a < b) {return -1}
                    return 0
                  })
                  .map((user, index) => {
                    console.log(user);
                    return (
                      <option key={index} value={user}>
                        {user}
                      </option>
                    )
                  })
              }
            </select>
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
                setSortElemtns={setSortElemtns}
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
