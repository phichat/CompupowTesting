export interface EmpAddr {
    emCode: string;
    usr: string;
    smrt?: Date;
    address: Addresses[];
}

export interface Addresses {
    emType: string;
    emAddr1: string;
    emAddr2: string;
}