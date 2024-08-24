import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './UserTable.css';

const UserTable = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    fetch('https://leader-acadmy.hwnix.com/api/code/users')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Inspect the structure
        setCodes(data.codes || []); // Set the codes array from the response
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <motion.div 
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>User Codes</h2>
      {codes.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <motion.tr 
                key={code.id} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <td>{code.code}</td>
                <td>{code.user ? code.user.name : 'Not used'}</td>
                <td>{code.user ? code.user.phone : 'Not used'}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </motion.div>
  );
};

export default UserTable;
