export interface AcademicRecordPDF {
  studentId: number;
  pdfBase64: string;
}

export interface AcademicRecord {
  year: string;
  randomStudent: number;
  career: string;
  university: string;
}

export interface Academic {
  id: number;
  name: string;
  grade: string;
  year: string;
  identification: string;
}
