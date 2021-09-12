export const Info = ({user}) => {
    return(
        <div className="info">
            <h3>Profile info:</h3>
            <p><b>Selected profile: </b>{user.firstName} {user.lastName}</p>
            <p><b>Description: </b>{user.description}</p>
            <p><b>Address: </b>{user.adress.zip}, {user.adress.streetAddress}</p>
            <p><b>City: </b>{user.adress.city}</p>
            <p><b>State: </b>{user.adress.state}</p>
            <p><b>Index: </b>{user.id}</p>
        </div>
    )
}
