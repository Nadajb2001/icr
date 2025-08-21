import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
  
    const email = localStorage.getItem('email');
    if ( email) {
      setIsLoggedIn(true);
     
    }
  }, []);

  function handleLogout(){
    window.localStorage.removeItem("email");
    window.location.pathname="/";
  }


  return (
    <div className="container">
      <nav className="d-flex">
        
        <div className="d-flex">
          {isLoggedIn ? (
            <>
              
    
            </>
          ) : (
            <>
         
            </>
          )}
        </div>
      </nav>
    </div>
  );
}