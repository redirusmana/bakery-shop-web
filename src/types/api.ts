export interface ApiErrorDetail {
  message: string;
  field?: string; 
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;

  errors?: ApiErrorDetail[];
}
