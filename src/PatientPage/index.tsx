import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Icon, Header, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, updatePatient } from '../state';
import EntryDetails from './EntryDetails';
import AddEntryModal from './AddEntryModal';
import { EntryFormValues } from './AddEntryForm';

const PatientPage: React.FC = () => {
    interface ParamTypes {
        id: string;
    }
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<ParamTypes>();
    const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log(values);
        try {
            const {data: updatedPatient} = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                {
                    ...values,
                    type: 'HealthCheck'
                }
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        }catch(error) {
            console.error(error);
            setError(error.response.data.error);
        }
    };

    React.useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientData);
                dispatch(updatePatient(patientData));
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
    }, [id, dispatch, patients]);

    if (!patient) {
        return (
            <></>
        );
    }

    return (
        <div className="App">
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
            <Header as="h3">
                Entries
            </Header>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}><Icon name="hospital"/></Button>
            {
                patient.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}></EntryDetails>)
            }
        </div>
    );
};

export default PatientPage;