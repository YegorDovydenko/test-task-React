// import { useState } from "react"

export const Pagination = ({usersPerPage, allElements, paginate, pages, currentPage, setCurrentPage}) => {
    
    const pageNumbers = []
    // const [style, setStyle] = useState('')

    for(let i = 1; i <= Math.ceil(allElements/usersPerPage); i++){
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if(currentPage === pages){
            setCurrentPage(0)
        }
        setCurrentPage(pv => pv + 1)
    }

    const prevPage = () => {
        if(currentPage === 1){
            setCurrentPage(pages + 1)
        }
        setCurrentPage(pv => pv - 1)
    }

    return(
        <>
            <div className="pagination">
                <h3>Pages found:</h3>
                <ul>
                    {
                        pageNumbers.map(number => {
                            let isActiveClass = false
                            if(currentPage === number){
                                isActiveClass = true
                            }
                            
                            return(
                                <li key={number}>
                                    <a className={isActiveClass ? "active" : ""} href="!#" onClick={() => paginate(number)}>{number}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                allElements > usersPerPage
                ?
                <div>
                    <button onClick={prevPage}>Prev</button>
                    <button onClick={nextPage}>Next</button>
                </div>
                :
                null
            }
        </>
    )

}