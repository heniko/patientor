import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Icon, Header } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
    interface ParamTypes {
        id: string;
    }
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<ParamTypes>();
    const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

    React.useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientData);
                dispatch({ type: 'UPDATE_PATIENT', payload: patientData });
            } catch (error) {
                console.error(error);
            }
        };
        const containsOptionalFields = (patient: Patient): boolean => {
            if (patient.ssn && patient.entries && patient.dateOfBirth) {
                return true;
            } else {
                return false;
            }
        };

        const memoPatient = patients[id];
        if (memoPatient && containsOptionalFields(memoPatient)) {
            setPatient(memoPatient);
        } else {
            fetchPatientData();
        }
    }, [id, dispatch]);

    if (!patient) {
        return (
            <></>
        );
    }

    return (
        <div>
            <Header as="h2">
                {patient.name}
                {
                    patient.gender === 'male'
                        ?
                        <Icon name="mars" />
                        :
                        patient.gender === 'female'
                            ?
                            <Icon name="venus" />
                            :
                            <Icon name="genderless" />
                }
            </Header>
            <p>
                ssn: {patient.ssn}
            </p>
            <p>
                occupation: {patient.occupation}
            </p>
        </div>
    );
};

export default PatientPage;