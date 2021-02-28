import React from 'react';

import { Entry } from '../types';
import { useStateValue } from '../state';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div>
            <p>{entry.date} {entry.description}</p>
            <ul>
                {
                    entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)
                }
            </ul>
        </div>
    );
};

export default EntryDetails;