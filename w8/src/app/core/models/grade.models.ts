export interface GradeRecord { studentId: string; subject: string; attendance: number; midterm: number; final: number; finalScore: number; }
export type GradeInput = Omit<GradeRecord, 'finalScore'>;
export interface GradeState { saving: boolean; saved: boolean; error: string | null; }
