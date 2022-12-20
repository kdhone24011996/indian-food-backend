import axios from 'axios';

export const getRemainingTime = (time: string) => {
  return new Date(time).getTime() - new Date().getTime();
};
export const isImage = (fileType: any) => {
  if (!fileType) return false;
  if (!fileType.match(/.(jpg|jpeg|png|gif|svg)$/i)) return false;
  else return true;
};

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function makeEllipses(name: string, toLength: number) {
  return `${name.slice(0, toLength)}...`;
}

export const getAllDivisions = () => {
  return {
    SALES: 'Sales',
    CUSTOMER_SERVICE: 'Customer Service',
    OPERATIONS: 'Operations',
    FINANCE: 'Finance',
    MARKETING: 'Marketing',
    PRODUCT_AND_ENGINEERING: 'Product and Engineering',
  };
};
