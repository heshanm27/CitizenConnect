import React from 'react';
import { Redirect } from 'react-router-dom';

const Documents = () => {
  const redirectToPage = (page) => {
    // Perform any necessary logic before redirecting
    // For simplicity, this example directly redirects to the respective page
    switch (page) {
      case 'birth':
        window.location.href = '/request-birth-certificate';
        break;
      case 'marriage':
        window.location.href = '/request-marriage-certificate';
        break;
      case 'death':
        window.location.href = '/request-death-certificate';
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        <li onClick={() => redirectToPage('birth')}>Request Birth Certificate</li>
        <li onClick={() => redirectToPage('marriage')}>Request Marriage Certificate</li>
        <li onClick={() => redirectToPage('death')}>Request Death Certificate</li>
      </ul>
    </div>
  );
};

export default Documents;
