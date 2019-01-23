export interface Employee {
    emCode: string;
    emTname: string;
    emEname: string;
    emBirthdate?: Date;
    emChild?: number;
    usr: string;
    smpt?: Date;
}

export interface EmployeeDropdown {
    emCode: string;
    emName: string;
}
