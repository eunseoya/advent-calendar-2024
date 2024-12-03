// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { Link, useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const { currentUser, signup, logout } = useAuth();
//     const [formData, setFormData] = useState({
//         nickname: '',
//         actualName: '',
//         passcode: '',
//         email: '',
//         relationship: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (currentUser) {
//             console.log(currentUser.uid)
//             const fetchProfile = async () => {
//                 try {
//                     const docRef = doc(db, 'profiles', currentUser.uid);
//                     const docSnap = await getDoc(docRef);
//                     if (docSnap.exists()) {
//                         setFormData(docSnap.data());
//                     }
//                 } catch (error) {
//                     if (error.message.includes('offline')) {
//                         setError('Failed to get document because the client is offline. Retrying...');
//                         window.addEventListener('online', fetchProfile);
//                     } else {
//                         setError(error.message);
//                     }
//                 }
//             };
//             fetchProfile();
//         } else {
//             navigate('/login');
//         }
//     }, [currentUser, navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             if (currentUser) {
//                 const docRef = doc(db, 'profiles', currentUser.uid);
//                 await setDoc(docRef, formData);
//                 alert('Profile saved!');
//             } else {
//                 // Create account logic
//                 const { email, passcode } = formData;
//                 await signup(email, passcode);
//                 navigate('/');
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-4 bg-[#f3eeda]">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl">Profile</h2>
//                 <Link to="/login" className="text-[#6d1c22]">
//                     Log in
//                 </Link>
//             </div>
//             <form onSubmit={handleSave} className="w-full max-w-md flex flex-col gap-4">
//                 <label className="block">
//                     Nickname:
//                     <input 
//                         type="text" 
//                         name="nickname"
//                         value={formData.nickname}
//                         onChange={handleChange}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <label className="block">
//                     Actual Name:
//                     <input 
//                         type="text" 
//                         name="actualName"
//                         value={formData.actualName}
//                         onChange={handleChange}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <label className="block">
//                     Passcode:
//                     <input 
//                         type="password" 
//                         name="passcode"
//                         value={formData.passcode}
//                         onChange={handleChange}
//                         className="px-4 py-2 border rounded w-full"
//                         pattern="\d{6}"
//                         required
//                     />
//                 </label>
//                 <label className="block">
//                     Email:
//                     <input 
//                         type="email" 
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <label className="block">
//                     Relationship:
//                     <input 
//                         type="text" 
//                         name="relationship"
//                         value={formData.relationship}
//                         onChange={handleChange}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <button 
//                     type="submit"
//                     className="px-4 py-2 bg-[#6d1c22] text-white rounded"
//                     disabled={loading}
//                 >
//                     {loading ? 'Saving...' : 'Save'}
//                 </button>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Profile;