export interface AcademicRecordPDF {
  studentId: number;
  pdfBase64: string;
}

export interface AcademicRecord {
  id: number;
  randomStudent: number;
  universityId: number;
  img: string;
  university: string;
  faculty: string;
  school: string;
  year: string;
}
