import {AcademicGateway} from '../domian';

export class AcademicActions {
  constructor(private readonly academicGateway: AcademicGateway) {}

  async getAcademicRecord(identification: string, studentId: number) {
    return this.academicGateway.getAcademicRecord(identification, studentId);
  }

  async getAcademicRecordPDF(studentId: number, identification: string) {
    return this.academicGateway.getAcademicRecordPDF(studentId, identification);
  }

  async getAcademic() {
    return this.academicGateway.getAcademic();
  }
}
