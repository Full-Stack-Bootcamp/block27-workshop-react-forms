import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  async function handleClick() {
    console.log(token);
    if (token === null) {
      setError(
        "Please sign up with username and password first! Then you can click this authenticate button and get authenticated!!!"
      );
    } else {
      try {
        let response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let json = await response.json();
        setSuccessMessage(json.message);
        setUserName(json.data.username.userName);
        setError(null);
        console.log(token);

        // setUserName(json.)
      } catch (error) {
        console.log(token);
        setError(error.message);
      }
    }
  }

  return (
    <>
      {/* <h2>Authenticate</h2> */}
      {error && <p>Error: {error}</p>}
      {successMessage && (
        <>
          <h3>{successMessage}</h3> <p>Username: {userName}</p>
        </>
      )}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
