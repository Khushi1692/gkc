export interface ApiResponse<T = any> {
    status: 'success' | 'error' | 'warning';
    message: string;
    data: T | null;
}
