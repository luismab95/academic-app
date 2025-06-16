import {AcademicGateway} from '../Domian';

export class AcademicActions {
  constructor(private readonly academicGateway: AcademicGateway) {}

  async getAcademicRecord(
    identification: string,
    studentId: number,
    universityId: number,
  ) {
    return this.academicGateway.getAcademicRecord(
      identification,
      studentId,
      universityId,
    );
  }

  async getAcademicRecordPDF(
    universityId: number,
    studentId: number,
    identification: string,
  ) {
    return this.academicGateway.getAcademicRecordPDF(
      universityId,
      studentId,
      identification,
    );
  }

  async getAcademic() {
    return this.academicGateway.getAcademic();
  }
}
