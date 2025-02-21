import {AcademicGateway, AcademicRecord, AcademicRecordPDF} from '../../domian';
import {errorStore, GeneralResponse} from '../../shared';
import {axiosApi} from '../adapters/axiosApi';

export class AcademicService implements AcademicGateway {
  async getAcademic(): Promise<GeneralResponse<AcademicRecord> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<AcademicRecord>>(
        `/academic/record`,
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }

  async getAcademicRecord(
    identification: string,
    studentId: number,
  ): Promise<GeneralResponse<AcademicRecordPDF> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<AcademicRecordPDF>>(
        `/academic/record/pdf?identification=${identification}&studentId=${studentId}`,
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }

  async getAcademicRecordPDF(
    studentId: number,
    identification: string,
  ): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        `/academic/record`,
        {
          studentId,
          identification,
        },
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }
}
