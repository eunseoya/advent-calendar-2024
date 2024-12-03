// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//         });
//         return unsubscribe;
//     }, []);

//     const login = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const signup = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     const logout = () => {
//         return signOut(auth);
//     };

//     return (
//         <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);