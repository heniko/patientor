import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

interface EntryModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryFormValues) => void;
    error?: string;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: EntryModalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new health check entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddHospitalEntryModal;
