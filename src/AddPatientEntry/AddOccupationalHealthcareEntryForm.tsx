import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type OccupationalHealthcareEntryFormValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes: string[];
    employerName: string;
    startDate: string;
    endDate: string;
};

interface EntryFormProps {
    onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
    onCancel: () => void;
}

const AddOccupationalHealthcareEntryForm: React.FC<EntryFormProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                startDate: '',
                endDate: '',
                employerName: ''
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.sickLeaveDate = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Start date"
                            placeholder="YYYY-MM-DD"
                            name="startDate"
                            component={TextField}
                        />
                        <Field
                            label="End date"
                            placeholder="YYYY-MM-DD"
                            name="endDate"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                            </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddOccupationalHealthcareEntryForm;