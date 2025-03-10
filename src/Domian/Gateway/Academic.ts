import {GeneralResponse} from '../../Shared';
import {AcademicRecord, AcademicRecordPDF} from '..';

export interface AcademicGateway {
  getAcademic(): Promise<GeneralResponse<AcademicRecord[]> | null>;
  getAcademicRecord(
    identification: string,
    studentId: number,
    universityId: number,
  ): Promise<GeneralResponse<AcademicRecordPDF> | null>;
  getAcademicRecordPDF(
    universityId: number,
    studentId: number,
    identification: string,
  ): Promise<GeneralResponse<string> | null>;
}
