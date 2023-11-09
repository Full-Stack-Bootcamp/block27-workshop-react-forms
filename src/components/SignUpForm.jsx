import { useState } from "react";

// Create state for passwordError and nameError
// Create function that cheks if passsword > 8 characters and contains number?
// If not set error to correct error message
// If good, continue to try block

export default function SignUpForm({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(hasNumbers(password));
    if (userName.length < 6) {
      setError("Username must be at least 6 characters");
    } else if (password.length < 8 || !hasNumbers(password)) {
      setError(
        "Password must have at least 8 characters and contain at least 1 number"
      );
    } else {
      setError("Success!");
      try {
        let response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: { userName },
              password: { password },
            }),
          }
        );
        let result = await response.json();
        console.log(result);
        setToken(result.token);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    }
  }

  const hasNumbers = (password) => {
    // Checks if password contains numbers
    return /\d/.test(password);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
        <label>
          Username:{" "}
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
