import {AcademicGateway, AcademicRecord, AcademicRecordPDF} from '../../Domian';
import {errorStore, GeneralResponse} from '../../Shared';
import {axiosApi} from '../Adapters/AxiosAdapter';

export class AcademicService implements AcademicGateway {
  async getAcademic(): Promise<GeneralResponse<AcademicRecord[]> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<AcademicRecord[]>>(
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
    universityId: number,
  ): Promise<GeneralResponse<AcademicRecordPDF> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<AcademicRecordPDF>>(
        `/academic/record/pdf?identification=${identification}&studentId=${studentId}&universityId=${universityId}`,
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }

  async getAcademicRecordPDF(
    universityId: number,
    studentId: number,
    identification: string,
  ): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        `/academic/record`,
        {
          studentId,
          identification,
          universityId,
        },
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }
}
