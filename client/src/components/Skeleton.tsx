import React from "react";
import { IonItem, IonLabel, IonSkeletonText, IonThumbnail } from "@ionic/react";
import "./Skeleton.css";

const Skeleton: React.FC = () => {
  return (
    <div className="skeleton-container">
      <IonItem lines="none">
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonThumbnail>
        <IonLabel>
          <h3>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "60%" }}
            ></IonSkeletonText>
          </p>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "30%" }}
            ></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>
    </div>
  );
};

export default Skeleton;
