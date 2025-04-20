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
import { logoIonic, sparkles } from "ionicons/icons";
import { useState } from "react";

interface ContainerProps {}

const GeneratorContainer: React.FC<ContainerProps> = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const api_url = new URL("localhost:5000/api/gen_playlist");

  const handleClick = async () => {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        playlist_name: inputValue,
        library_songs: [ {title: "asdf"}, {title: "qwer"}, {title: "nfliu"} ],
        playlist_size: 2,
    }),
    });
    const data = await response.json(); 
    setData(data);
  };

  const updateInputValue = (event: CustomEvent) => {
    const value = event.detail.value;
    setInputValue(value);
  }


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
                  <IonInput placeholder="Ex: Hard Rock" onIonInput={updateInputValue}></IonInput>
                </IonItem>
              </IonCardContent>

              <IonButton expand="block">
                Generate
                <IonIcon
                  icon={sparkles}
                  className="ion-padding-horizontal"
                  onClick={
                    handleClick
                  }
                ></IonIcon>
              </IonButton>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Your generated playlist will appear here!
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent class="ion-no-padding ion-padding-vertical">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default GeneratorContainer;
