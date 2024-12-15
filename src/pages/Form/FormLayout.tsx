import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface User {
  firstName: string;
  lastName: string;
  phone: string;
}

const FormLayout = () => {
  const [userData, setUserData] = useState<User>({ firstName: '', lastName: '', phone: '' });
  const [storedUsers, setStoredUsers] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Load data from local storage on component mount
    const data = localStorage.getItem('users');
    if (data) {
      setStoredUsers(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddUserData = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.firstName && userData.lastName && userData.phone) {
      let updatedUsers;
      if (editIndex !== null) {
        updatedUsers = [...storedUsers];
        updatedUsers[editIndex] = userData;
        setEditIndex(null);
      } else {
        updatedUsers = [...storedUsers, userData];
      }
      setStoredUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUserData({ firstName: '', lastName: '', phone: '' }); // Reset form
    } else {
      alert('Please fill all fields before submitting.');
    }
  };

  const handleDelete = (index: number) => {
    const updatedUsers = storedUsers.filter((_, i) => i !== index);
    setStoredUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEdit = (index: number) => {
    setUserData(storedUsers[index]);
    setEditIndex(index);
  };

  const filteredUsers = storedUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Contact Form</h3>
            </div>
            <form onSubmit={handleAddUserData}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Phone No:</label>
                  <input
                    type="number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {editIndex !== null ? 'Update User Data' : 'Add User Data'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Data showing div --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Users Data</h3>
            </div>

            <div className="p-6.5">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by username"
                className="mb-4 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div key={index} className="mb-4.5 flex items-center justify-between">
                    <p className="text-black dark:text-white">
                      {index + 1}. {user.firstName} {user.lastName} - {user.phone}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-black dark:text-white">No user data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;







// import React, { useState, useEffect } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// interface User {
//   firstName: string;
//   lastName: string;
//   phone: string;
// }

// const FormLayout = () => {
//   const [userData, setUserData] = useState<User>({ firstName: '', lastName: '', phone: '' });
//   const [storedUsers, setStoredUsers] = useState<User[]>([]);
//   const [editIndex, setEditIndex] = useState<number | null>(null);

//   useEffect(() => {
//     // Load data from local storage on component mount
//     const data = localStorage.getItem('users');
//     if (data) {
//       setStoredUsers(JSON.parse(data));
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleAddUserData = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userData.firstName && userData.lastName && userData.phone) {
//       let updatedUsers;
//       if (editIndex !== null) {
//         updatedUsers = [...storedUsers];
//         updatedUsers[editIndex] = userData;
//         setEditIndex(null);
//       } else {
//         updatedUsers = [...storedUsers, userData];
//       }
//       setStoredUsers(updatedUsers);
//       localStorage.setItem('users', JSON.stringify(updatedUsers));
//       setUserData({ firstName: '', lastName: '', phone: '' }); // Reset form
//     } else {
//       alert('Please fill all fields before submitting.');
//     }
//   };

//   const handleDelete = (index: number) => {
//     const updatedUsers = storedUsers.filter((_, i) => i !== index);
//     setStoredUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//   };

//   const handleEdit = (index: number) => {
//     setUserData(storedUsers[index]);
//     setEditIndex(index);
//   };

//   return (
//     <>
//       <Breadcrumb pageName="Form Layout" />

//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//         <div className="flex flex-col gap-9">
//           {/* <!-- Contact Form --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">Contact Form</h3>
//             </div>
//             <form onSubmit={handleAddUserData}>
//               <div className="p-6.5">
//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">First name</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={userData.firstName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your first name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>

//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">Last name</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={userData.lastName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your last name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full xl:w-1/2">
//                   <label className="mb-2.5 block text-black dark:text-white">Phone No:</label>
//                   <input
//                     type="number"
//                     name="phone"
//                     value={userData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Enter your phone number"
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//                 >
//                   {editIndex !== null ? 'Update User Data' : 'Add User Data'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="flex flex-col gap-9">
//           {/* <!-- Data showing div --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">Users Data</h3>
//             </div>

//             <div className="p-6.5">
//               {storedUsers.length > 0 ? (
//                 storedUsers.map((user, index) => (
//                   <div key={index} className="mb-4.5 flex items-center justify-between">
//                     <p className="text-black dark:text-white">
//                       {index + 1}. {user.firstName} {user.lastName} - {user.phone}
//                     </p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(index)}
//                         className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(index)}
//                         className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-black dark:text-white">No user data available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FormLayout;



















// import React, { useState, useEffect } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// interface User {
//   firstName: string;
//   lastName: string;
//   phone: string;
// }

// const FormLayout = () => {
//   const [userData, setUserData] = useState<User>({ firstName: '', lastName: '', phone: '' });
//   const [storedUsers, setStoredUsers] = useState<User[]>([]);

//   useEffect(() => {
//     // Load data from local storage on component mount
//     const data = localStorage.getItem('users');
//     if (data) {
//       setStoredUsers(JSON.parse(data));
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleAddUserData = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userData.firstName && userData.lastName && userData.phone) {
//       const updatedUsers = [...storedUsers, userData];
//       setStoredUsers(updatedUsers);
//       localStorage.setItem('users', JSON.stringify(updatedUsers));
//       setUserData({ firstName: '', lastName: '', phone: '' }); // Reset form
//     } else {
//       alert('Please fill all fields before submitting.');
//     }
//   };

//   return (
//     <>
//       <Breadcrumb pageName="Form Layout" />

//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//         <div className="flex flex-col gap-9">
//           {/* <!-- Contact Form --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">Contact Form</h3>
//             </div>
//             <form onSubmit={handleAddUserData}>
//               <div className="p-6.5">
//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">First name</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={userData.firstName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your first name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>

//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">Last name</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={userData.lastName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your last name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full xl:w-1/2">
//                   <label className="mb-2.5 block text-black dark:text-white">Phone No:</label>
//                   <input
//                     type="number"
//                     name="phone"
//                     value={userData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Enter your phone number"
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//                 >
//                   Add User Data
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="flex flex-col gap-9">
//           {/* <!-- Data showing div --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">Users Data</h3>
//             </div>

//             <div className="p-6.5">
//               {storedUsers.length > 0 ? (
//                 storedUsers.map((user, index) => (
//                   <div key={index} className="mb-4.5">
//                     <p className="text-black dark:text-white">
//                       {index + 1}. {user.firstName} {user.lastName} - {user.phone}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-black dark:text-white">No user data available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FormLayout;












// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const FormLayout = () => {
//   return (
//     <>
//       <Breadcrumb pageName="Form Layout" />


//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//         <div className="flex flex-col gap-9">
//           {/* <!-- Contact Form --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Contact Form
//               </h3>
//             </div>
//             <form action="#">
//               <div className="p-6.5">
//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">
//                       First name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your first name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>

//                   <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">
//                       Last name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your last name"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full xl:w-1/2">
//                     <label className="mb-2.5 block text-black dark:text-white">
//                       Phone No:
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Enter your phone number"
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>

               

                


//                 <div className="mb-6">
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     Message
//                   </label>
//                   <textarea
//                     rows={6}
//                     placeholder="Type your message"
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   ></textarea>
//                 </div>

//                 <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="flex flex-col gap-9">
//           {/* <!-- Data showing div --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Users Data
//               </h3>
//             </div>
            
//               <div className="p-6.5">
//                 <div className="mb-4.5">
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     data 1 
//                   </label>
                  
//                 </div>

//                 <div>
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     data 2
//                   </label>
//                 </div>

               
//               </div>
//           </div>

 
//         </div>
//       </div>
//     </>
//   );
// };

// export default FormLayout;
