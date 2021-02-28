import React from 'react';

import { Entry } from '../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <p>{entry.date} {entry.description}</p>
            <ul>
                {
                    entry.diagnosisCodes?.map(code => <li>{code}</li>)
                }
            </ul>
        </div>
    );
};

export default EntryDetails;