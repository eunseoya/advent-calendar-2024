import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaEraser } from 'react-icons/fa';

const TextDisplayer = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            const querySnapshot = await getDocs(collection(db, 'submissions'));
            const submissionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubmissions(submissionsList);
        };

        fetchSubmissions();
    }, []);

    const handleDelete = async (id, password) => {
        const submission = submissions.find(sub => sub.id === id);
        if (submission.password === password) {
            await deleteDoc(doc(db, 'submissions', id));
            setSubmissions(submissions.filter(sub => sub.id !== id));
        } else {
            if (password !== null) {
            alert('Incorrect password');
            }
        }
    };

    return (
        <div>
             {submissions.map((submission, index) => (
        <div key={index} className="w-full p-2 border rounded mb-2 flex justify-between items-center">
           <p>{submission.text}</p>
           <button onClick={() => handleDelete(submission.id, prompt('Enter password to delete memory.'))} className="p-2 text-black rounded ml-2">
                        <FaEraser />
                    </button>
        </div>
      ))}
        </div>
    );
};

export default TextDisplayer;
