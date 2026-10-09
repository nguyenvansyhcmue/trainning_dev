export interface Student { studentId: string; fullName: string; gender: string; email: string; major: string; academicYear: number; }
export interface StudentsState { items: Student[]; loading: boolean; error: string | null; }
