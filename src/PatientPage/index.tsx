import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Icon, Header, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, updatePatient } from '../state';
import EntryDetails from './EntryDetails';
import AddHealthCheckEntryModal from '../AddPatientEntry/AddHealthCheckEntryModal';
import { HealthCheckEntryFormValues } from '../AddPatientEntry/AddHealthCheckEntryForm';
import { HospitalEntryFormValues } from '../AddPatientEntry/AddHospitalEntryForm';
import AddHospitalEntryModal from '../AddPatientEntry/AddHospitalEntryModal';
import { OccupationalHealthcareEntryFormValues } from '../AddPatientEntry/AddOccupationalHealthcareEntryForm';
import AddOccupationalHealthcareEntryModal from '../AddPatientEntry/AddOccupationalHealthcareEntryModal';

const PatientPage: React.FC = () => {
    interface ParamTypes {
        id: string;
    }
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<ParamTypes>();
    const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

    /*
        Health check entry
    */
    const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
    const [healthCheckError, setHealthCheckError] = React.useState<string | undefined>();

    const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);

    const closeHealthCheckModal = (): void => {
        setHealthCheckModalOpen(false);
        setHealthCheckError(undefined);
    };

    const submitNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
        console.log(values);
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                {
                    ...values,
                    type: 'HealthCheck'
                }
            );
            dispatch(updatePatient(updatedPatient));
            closeHealthCheckModal();
        } catch (error) {
            console.error(error);
            setHealthCheckError(error.response.data.error);
        }
    };

    /*
        Hospital entry
    */
    const [hospitalEntryModalOpen, setHospitalEntryModalOpen] = React.useState<boolean>(false);
    const [hospitalEntryError, setHospitalEntryError] = React.useState<string | undefined>();

    const openHospitalEntryModal = (): void => setHospitalEntryModalOpen(true);

    const closeHospitalEntryModal = (): void => {
        setHospitalEntryModalOpen(false);
        setHospitalEntryError(undefined);
    };

    const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                {
                    description: values.description,
                    date: values.date,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    discharge: {
                        date: values.dischargeDate,
                        criteria: values.dischargeCriteria
                    },
                    type: 'Hospital'
                }
            );
            dispatch(updatePatient(updatedPatient));
            closeHospitalEntryModal();
        } catch (error) {
            console.error(error);
            setHospitalEntryError(error.response.data.error);
        }
    };

    /*
        Occupational healthcare entry 
    */
    const [OccupationalEntryModalOpen, setOccupationalEntryModalOpen] = React.useState<boolean>(false);
    const [occupationalEntryError, setOccupationalEntryError] = React.useState<string | undefined>();

    const openOccupationalEntryModal = (): void => setOccupationalEntryModalOpen(true);

    const closeOccupationalEntryModal = (): void => {
        setOccupationalEntryModalOpen(false);
        setOccupationalEntryError(undefined);
    };

    const submitNewOccupationalEntry = async (values: OccupationalHealthcareEntryFormValues) => {
        try {
            let newEntry;
            if (values.startDate && values.endDate) {
                newEntry = {
                    description: values.description,
                    date: values.date,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    employerName: values.employerName,
                    sickLeave: {
                        startDate: values.startDate,
                        endDate: values.endDate
                    },
                    type: 'OccupationalHealthcare'
                }
            } else {
                newEntry = {
                    description: values.description,
                    date: values.date,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    employerName: values.employerName,
                    type: 'OccupationalHealthcare'
                }
            }
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                newEntry
            );
            dispatch(updatePatient(updatedPatient));
            closeOccupationalEntryModal();
        } catch (error) {
            console.error(error);
            setHospitalEntryError(error.response.data.error);
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
            <AddHealthCheckEntryModal
                modalOpen={healthCheckModalOpen}
                onSubmit={submitNewHealthCheckEntry}
                error={healthCheckError}
                onClose={closeHealthCheckModal}
            />
            <Button onClick={() => openHealthCheckModal()}><Icon name="doctor" /></Button>
            <AddHospitalEntryModal
                modalOpen={hospitalEntryModalOpen}
                onSubmit={submitNewHospitalEntry}
                error={hospitalEntryError}
                onClose={closeHospitalEntryModal}
            />
            <Button onClick={() => openHospitalEntryModal()}><Icon name="hospital" /></Button>
            <AddOccupationalHealthcareEntryModal
                modalOpen={OccupationalEntryModalOpen}
                onSubmit={submitNewOccupationalEntry}
                error={occupationalEntryError}
                onClose={closeOccupationalEntryModal}
            />
            <Button onClick={() => openOccupationalEntryModal()}><Icon name="cog" /></Button>
            {
                patient.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}></EntryDetails>)
            }
        </div>
    );
};

export default PatientPage;