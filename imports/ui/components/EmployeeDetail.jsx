import React from 'react'

const EmployeeDetail = ({employee}) => {
   
    const {name, email, phone} = employee
    
  return (
    <div className="thumbnail">
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
    </div>
  );
}

export default EmployeeDetail