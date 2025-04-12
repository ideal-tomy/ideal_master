import type { Case } from '../types/case';
import { getCases as getServerCases, getCaseById as getServerCaseById } from './api/serverlessClient';
import type { MicroCMSResponse } from '../types';

export const getCases = async (): Promise<Case[]> => {
  try {
    const data = await getServerCases() as MicroCMSResponse<Case>;
    return data.contents;
  } catch (error) {
    console.error('データ取得エラー:', error);
    throw error;
  }
};

export const getCaseById = async (id: string): Promise<Case> => {
  try {
    const data = await getServerCaseById(id) as Case;
    console.log('詳細データ:', data);
    return data;
  } catch (error) {
    console.error('詳細データ取得エラー:', error);
    throw error;
  }
}; 