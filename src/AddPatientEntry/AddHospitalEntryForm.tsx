import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type HospitalEntryFormValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes: string[];
    dischargeDate: string;
    dischargeCriteria: string;
};

interface EntryFormProps {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const AddHospitalEntryForm: React.FC<EntryFormProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                dischargeDate: '',
                dischargeCriteria: ''
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
                if (!values.dischargeDate) {
                    errors.sickLeaveDate = requiredError;
                }
                if (!values.dischargeCriteria) {
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
                            label="Discharge date"
                            placeholder="YYYY-MM-DD"
                            name="dischargeDate"
                            component={TextField}
                        />
                        <Field
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
                            name="dischargeCriteria"
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

export default AddHospitalEntryForm;