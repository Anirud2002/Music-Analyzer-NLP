import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const CLIENT_ID = "f0ed18bc71304925886e4b313fe5777c";
const REDIRECT_URI = "http://[::1]:5173/callback"; // adjust for deployment

export default function Callback() {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log(code);
    

    if (!code) {
      setError("Authorization code not found in URL");
      return;
    }

    localStorage.setItem("spotify_auth_code", code);

    const codeVerifier = sessionStorage.getItem("code_verifier");

    if (!codeVerifier) {
      setError("Code verifier not found in sessionStorage");
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier
          })
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);
          localStorage.setItem("spotify_refresh_token", data.refresh_token);
          history.push("/"); // redirect to homepage or dashboard
        } else {
          setError("Failed to get access token");
          console.error("Token error:", data);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong during token exchange.");
      }
    };

    exchangeToken();
  }, [history]);

  return (
    <div className="flex items-center justify-center h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Exchanging authorization code for access token...</p>
      )}
    </div>
  );
}
