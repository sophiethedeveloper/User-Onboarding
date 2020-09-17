import React from 'react';

function DisplayForm({ details }) {
    return (
        <div>
            <h2>{`${details.first_name} ${details.last_name}`}</h2>
            <p>Email: {details.email}</p>
        </div>
    )
}

export default DisplayForm;