import React, { useState } from 'react';

const PasscodeForm = ({ onPasscodeSubmit }) => {
    const [passcode, setPasscode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onPasscodeSubmit(passcode);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-2 bg-[#4d9165] text-white rounded">Submit</button>
        </form>
    );
};

export default PasscodeForm;