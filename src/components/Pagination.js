export const Pagination = ({usersPerPage, allElements, paginate}) => {
    
    const pageNumberds = []

    for(let i = 1; i <= Math.ceil(allElements/usersPerPage); i++){
        pageNumberds.push(i)
    }

    return(
        <div className="pagination">
            <h3>Pages found:</h3>
            <ul>
                {
                    pageNumberds.map(number => (
                        <li key={number}>
                            <a href="!#" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}