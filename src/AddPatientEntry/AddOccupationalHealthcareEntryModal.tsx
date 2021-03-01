import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from './AddOccupationalHealthcareEntryForm';

interface EntryModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
    error?: string;
}

const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: EntryModalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new health check entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddOccupationalHealthcareEntryModal;
