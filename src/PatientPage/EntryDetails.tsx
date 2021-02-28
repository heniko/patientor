import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { Entry, Type, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const entryStyle = {
        border: '1px solid',
        borderColor: 'grey',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px'
    };

    const descriptionStyle = {
        color: 'grey',
        fontStyle: 'italic'
    };

    switch (entry.type) {
        case Type.HospitalEntry:
            return (
                <div style={entryStyle}>
                    <Header as="h3">
                        {entry.date} <Icon name="hospital" />
                    </Header>
                    <p style={descriptionStyle}>
                        {entry.description}
                    </p>
                    <ul>
                        {
                            entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)
                        }
                    </ul>
                </div>
            );
        case Type.HealthCheckEntry:
            return (
                <div style={entryStyle}>
                    <Header as="h3">
                        {entry.date} <Icon name="doctor" />
                    </Header>
                    <p style={descriptionStyle}>
                        {entry.description}
                    </p>
                    <Icon
                        color={
                            entry.healthCheckRating === HealthCheckRating.Healthy ?
                                "green"
                                :
                                entry.healthCheckRating === HealthCheckRating.LowRisk ?
                                    "yellow"
                                    :
                                    entry.healthCheckRating === HealthCheckRating.HighRisk ?
                                        "red"
                                        :
                                        "black"
                        }
                        name="heart"
                    />
                    <ul>
                        {
                            entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)
                        }
                    </ul>
                </div>
            );
        case Type.OccupationalHealthCareEntry:
            return (
                <div style={entryStyle}>
                    <Header>
                        {entry.date} <Icon name="cog" />
                    </Header>
                    <p style={descriptionStyle}>
                        {entry.description}
                    </p>
                    <ul>
                        {
                            entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)
                        }
                    </ul>
                </div>
            );
        default:
            assertNever(entry);
    }
    return (<></>);
};

export default EntryDetails;