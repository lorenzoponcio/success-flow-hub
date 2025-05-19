
// This declares the module for antd and its submodules to fix type issues
declare module 'antd';
declare module 'antd/lib/locale/pt_BR';
declare module 'antd/es/table';
declare module 'antd/es/checkbox';
declare module '@ant-design/icons';
declare module '@ant-design/charts' {
  export interface ColumnConfig {
    data: any[];
    xField: string;
    yField: string;
    color?: string;
    label?: {
      formatter?: (text: any) => any;
      style?: {
        fill?: string;
        opacity?: number;
      };
    };
    xAxis?: {
      label?: {
        autoHide?: boolean;
        autoRotate?: boolean;
      };
    };
    meta?: Record<string, { alias?: string }>;
  }
  
  export const Column: React.FC<ColumnConfig>;
}
