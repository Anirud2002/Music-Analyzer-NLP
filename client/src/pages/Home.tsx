import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GeneratorContainer from "../components/GeneratorContainer";
import "./Home.css";

const Home: React.FC = () => {
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
        <GeneratorContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
