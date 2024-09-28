type FingerPrint = {
  student_id: string;
  id: string; // (uuid)
  image: string;
  priority: number;
};

type Details = {
  student_id: string;
  id: string; // (uuid)
  aadhar_number: number; // full aadhar number
  mubile: number;
  email: string;
  address: string;
  domicileState: string;
  domicileDistric: string;
  idType: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  fatherGuardian: string;
  motherGuardian: string;
  religion: string;
  castCategory: string;
  disability: boolean;
  disabilityType?: string;
  employed: boolean;
  employmentStatus?: string;
  employmentDetails?: string;
  trainingProgram: string;
};

type Student = {
  id: string; // (uuid)
  createdAt: string;
  updatedAt: string;
  name: string;
  aadhar_number: number; // last 8 digits
  state: string; // "IN" of student is IN or "OUT" of student is OUT else "ABSENT"
  fingerPrints: FingerPrint[];
  Details?: Details;
};

type Batch = {
  id: string; // (uuid)
  createdAt: string;
  updatedAt: string;
  name: string;
  inTime: string;
  outTime: string;
  Students: Student[];
  state: boolean; // true if batch is active
};

type User = {
  id: string; // (uuid)
  createdAt: string;
  updatedAt: string;
  userName: string;
  password: string;
  Batches: Batch[];
  role: "User";
};

type Admin = {
  id: string; // (uuid)
  createdAt: string;
  updatedAt: string;
  userName: string;
  password: string;
  Users: User[];
  role: "Admin";
};

//----> Start

type SuperAdmin = {
  id: string; // (uuid)
  userName: string;
  password: string;
  Admin: Admin[];
  role: "Super Admin";
};

//*----> Api Types <-----------------------------

//*----> Admin Api Types <--------------------

//*----> /superAdmin-dashboard Api Types <------

type getSuperAdminByToken = {
  id: string;
  userName: string;
  role: "Super Admin";
  Admin: Admin[]; // length of Admins

  // update logged in Super Admin -> userName & password | delete Super Admin -> logout
};

//*----> /superAdmin-dashboard/admin Api Types <------

type getAllAdminsByToken = {
  id: string;
  SuperAdminUserName: string;
  role: "Super Admin";
  Admin: Admin[]; // length of Admins | list of Admin UserNames | created_At |  updated_At

  // update admin -> userAnme & password | delete admin
};

//*----> Admin Api Types <--------------------

//*----> /admin-dashboard Api Types <------

type getAdminByToken = {
  id: string;
  userName: string;
  Users: User[]; // length of users
  Batches: Batch[]; // length of all batches | length of active batches
  Students: Student[]; // length of all students

  // update loggedIn admin -> userName & password | delete admin -> logout
};

//*----> /admin-dashboard/users Api Types <------

type getAllUsersByToken = {
  id: string;
  adminUserName: string;
  Users: User[]; // length of all users | list of userId | list of user Usernames | length of batches | length of active batches | created_At |  updated_At

  // create new user | update user -> userName & password | delete user
};

//*----> /admin-dashboard/users/[userId] Api Types <------

type getAllBatchsByUserId = {
  id: string;
  adminUserName: string;
  userUserName: string;
  Batches: Batch[]; // length of all batches | list of batch names | length of active batches | length of students | created_At |  updated_At

  // create new batch | update batch -> batchName, inTime & outTime, state | delete batch
};

//*----> /admin-dashboard/users/[userId]/[batchId] Api Types <------

type getAllStudentsByBatchId = {
  id: string;
  adminUserName: string;
  userUserName: string;
  batchName: string;
  Students: Student[]; // length of all students | list of student names | length of fingerprints | state of student | created_At |  updated_At

  /* 
    add fingerprints:
      01. One by One -> enhanced or unEnhanced -> toBase64 -> preview of uploaded fingerprints
      02. Bulk -> enhanced only
 */

  // create new student | update student -> aadhar_number, FingerPrints, Details? | delete student
};

//*----> User Api Types <--------------------

//*----> /user-dashboard Api Types <------

type getUserByToken = {
  id: string;
  userName: string;
  Batches: Batch[]; // length of all batches | length of active batches
  Students: Student[]; // length of all students
};

//*----> /user-dashboard/batches Api Types <------

type getAllBatchsByToken = {
  id: string;
  adminUserName: string;
  userUserName: string;
  Batches: Batch[]; // length of all batches | list of batch names | length of active batches | length of students | created_At |  updated_At

  // create new batch | update batch -> batchName, inTime & outTime, state | delete batch
};

//*----> /user-dashboard/batches/[batchId] Api Types <------

// same as getAllStudentsByBatchId
