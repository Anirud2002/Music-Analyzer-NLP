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

interface ContainerProps {}

const GeneratorContainer: React.FC<ContainerProps> = () => {
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
                  <IonInput placeholder="Ex: Hard Rock"></IonInput>
                </IonItem>
              </IonCardContent>

              <IonButton expand="block">
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
