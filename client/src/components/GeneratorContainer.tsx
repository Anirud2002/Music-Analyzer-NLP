import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import "./GeneratorContainer.css";
import Skeleton from "./Skeleton";
import { logoIonic, sparkles, add } from "ionicons/icons";
import { useEffect, useState } from "react";

interface ContainerProps {}

const GeneratorContainer: React.FC<ContainerProps> = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userSongs, setUserSongs] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const api_url = new URL("http://127.0.0.1:5000/api/gen_playlist");
  const accessToken = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text(); // read plain text if not valid JSON
            throw new Error(`Spotify error: ${response.status} - ${errorText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched user songs:", data);
          var simplifiedData = data.items.map((item: any) => ({
            title: item.track.name,
            uri: item.track.uri,
            artist: item.track.artists[0].name,
          }));

          setUserSongs(simplifiedData);
          console.log("User songs:", simplifiedData);
        })
        .catch((err) => {
          console.error("Fetch error:", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlist_name: inputValue,
        library_songs: userSongs,
        playlist_size: 5,
      }),
    }).finally(() => setLoading(false));
    const data = await response.json();
    setData(data);
    console.log("Generated playlist:", data);
  };

  const updateInputValue = (event: CustomEvent) => {
    const value = event.detail.value;
    setInputValue(value);
  };

  return (
    <div id="container">
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Enter your favorite genre of music</IonCardTitle>
              </IonCardHeader>
              <IonCardContent class="ion-no-padding ion-padding-vertical">
                <IonItem>
                  <IonInput
                    placeholder="Ex: Hard Rock"
                    onIonInput={updateInputValue}
                  ></IonInput>
                </IonItem>
              </IonCardContent>

              <IonButton expand="block" onClick={handleClick}>
                Generate
                <IonIcon
                  icon={sparkles}
                  className="ion-padding-horizontal"
                ></IonIcon>
              </IonButton>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  {loading
                    ? "Generating..."
                    : "Your generated playlist will appear here!"}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent class="ion-no-padding ion-padding-vertical">
                {loading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
              </IonCardContent>
            </IonCard>
            <IonButton expand="block" color="secondary">
              <IonIcon
                slot="start"
                icon={add}
                className="ion-padding-horizontal"
              />
              Create Playlist
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default GeneratorContainer;
