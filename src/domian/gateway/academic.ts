import {GeneralResponse} from '../../shared';
import {AcademicRecord, AcademicRecordPDF} from '../entittes/academic';

export interface AcademicGateway {
  getAcademic(): Promise<GeneralResponse<AcademicRecord> | null>;
  getAcademicRecord(
    identification: string,
    studentId: number,
  ): Promise<GeneralResponse<AcademicRecordPDF> | null>;
  getAcademicRecordPDF(
    studentId: number,
    identification: string,
  ): Promise<GeneralResponse<string> | null>;
}
