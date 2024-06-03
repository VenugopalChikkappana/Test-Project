export interface Address {
    street: string;
    number: string;
    plz: string;
    city: string;
}
  
export interface CADS {
    name: string;
    address: Address;
    email: string;
    phone: string;
}