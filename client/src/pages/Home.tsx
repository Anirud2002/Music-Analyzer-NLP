import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import GeneratorContainer from "../components/GeneratorContainer";
import "./Home.css";
import { useEffect } from "react";
import { generateRandomString, generateCodeChallenge } from "../auth/pkce";

const CLIENT_ID = "f0ed18bc71304925886e4b313fe5777c";
const REDIRECT_URI = "http://[::1]:5173/callback"; // adjust for deployment
// const SCOPES =
//   "playlist-modify-public playlist-modify-private user-library-read";
const SCOPES = "user-library-read user-top-read";

const Home: React.FC = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("spotify_access_token");
    const spotifyUserId = localStorage.getItem("spotify_user_id");

    // If no access token, initiate PKCE flow
    if (!accessToken) {
      const verifier = generateRandomString();
      generateCodeChallenge(verifier).then((challenge) => {
        sessionStorage.setItem("code_verifier", verifier);

        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.searchParams.append("client_id", CLIENT_ID);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
        authUrl.searchParams.append("scope", SCOPES);
        authUrl.searchParams.append("code_challenge_method", "S256");
        authUrl.searchParams.append("code_challenge", challenge);

        // Redirect user to Spotify auth page
        window.location.href = authUrl.toString();
      });
    }

    if (!spotifyUserId) {
      if (accessToken) {
        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("spotify_user_id", data.id);
          });
      }
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Music Playlist Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Music Playlist Generator</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* App Content */}
        <GeneratorContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
