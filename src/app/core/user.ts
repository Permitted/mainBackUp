//  ------ User Interface Area Start ------

// User role interface
export interface Roles {
  staff: boolean;
  manager?: boolean;
  admin?: boolean;
}
// User info interface
export interface Info {
  name: string;
  surname: string;
  age: string;
}




// User interface
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role?: Roles; // User role
  info?: Info;

}
//  ------ User Interface Area End ------
