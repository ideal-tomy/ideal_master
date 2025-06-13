import { ServiceType, allServices } from "../types/service";

/**
 * 指定されたサービスに関連するサービスを取得
 */
export const getRelatedServices = (currentService: ServiceType): ServiceType[] => {
  return allServices.filter(service => 
    currentService.relatedServices.includes(service.id)
  );
};

/**
 * 指定されたサービスIDからサービスオブジェクトを取得
 */
export const getServiceById = (id: string): ServiceType | undefined => {
  return allServices.find(service => service.id === id);
};

/**
 * 現在のサービスを除外した他のサービスを取得
 */
export const getOtherServices = (currentService: ServiceType): ServiceType[] => {
  return allServices.filter(service => service.id !== currentService.id);
}; 