// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const { login } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await login(email, password);
//             navigate('/profile');
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl mb-4">Login</h2>
//             <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
//                 <label className="block">
//                     Email:
//                     <input 
//                         type="email" 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <label className="block">
//                     Password:
//                     <input 
//                         type="password" 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="px-4 py-2 border rounded w-full"
//                         required
//                     />
//                 </label>
//                 <button 
//                     type="submit"
//                     className="px-4 py-2 bg-[#6d1c22] text-white rounded"
//                 >
//                     Login
//                 </button>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Login;