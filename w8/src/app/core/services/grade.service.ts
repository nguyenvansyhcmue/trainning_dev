import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GradeInput, GradeRecord } from '../models/grade.models';

const GRADE_RECORDS_KEY = 'w8.grade_records';

@Injectable({ providedIn: 'root' })
export class GradeService {
  private readonly recordsSubject = new BehaviorSubject<GradeRecord[]>(this.getStoredRecords());

  get records$(): Observable<GradeRecord[]> {
    return this.recordsSubject.asObservable();
  }

  save(record: GradeInput): Observable<GradeRecord> {
    const normalizedRecord = {
      ...record,
      finalScore: this.calculateFinalScore(record)
    };
    const records = this.getStoredRecords();
    const updatedRecords = [...records, normalizedRecord];
    localStorage.setItem(GRADE_RECORDS_KEY, JSON.stringify(updatedRecords));
    this.recordsSubject.next(updatedRecords);
    return of(normalizedRecord);
  }

  private calculateFinalScore(record: Pick<GradeRecord, 'attendance' | 'midterm' | 'final'>): number {
    const score = record.attendance * 0.1 + record.midterm * 0.3 + record.final * 0.6;
    return Number(score.toFixed(2));
  }

  private getStoredRecords(): GradeRecord[] {
    const value = localStorage.getItem(GRADE_RECORDS_KEY);
    if (!value) return [];
    try {
      const records = JSON.parse(value) as GradeRecord[];
      return records.map(record => ({
        ...record,
        finalScore: record.finalScore ?? this.calculateFinalScore(record)
      }));
    } catch {
      localStorage.removeItem(GRADE_RECORDS_KEY);
      return [];
    }
  }
}
