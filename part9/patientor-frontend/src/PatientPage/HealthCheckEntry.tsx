import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface HealthCheckProp {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: HealthCheckProp) => {

  const generateRatingIcon = () => {
    if(entry.healthCheckRating === HealthCheckRating.Healthy){
      return <Icon name="heart" color="green" />;
    } else if(entry.healthCheckRating === HealthCheckRating.LowRisk){
      return <Icon name="heart" color="yellow" />;
    } else if(entry.healthCheckRating === HealthCheckRating.HighRisk){
      return <Icon name="heart" color="orange" />;
    } else if(entry.healthCheckRating === HealthCheckRating.CriticalRisk){
      return <Icon name="heart" color="red" />;
    } 
  };

  return(
    <div style={{paddingBottom: 10, paddingTop: 10}}>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon name='user doctor' size="large" />
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
          <Card.Description>
            {generateRatingIcon()}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default HealthCheck;