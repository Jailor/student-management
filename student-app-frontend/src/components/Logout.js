import React from 'react';


const Logout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  
  return (
    <div>Redirecting...</div>
  );
};

export default Logout;