// src/utils/errorHandler.ts
import type { ApiResponse } from '@/types/api';
import type { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
    if (!error) return 'Unknown error';

    // Check if it's an Axios error
    if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (!axiosError.response) return 'Network error. Please check your connection.';
        if (axiosError.response.data?.message) return axiosError.response.data.message;
        return 'Something went wrong with the server.';
    }

    // If it's a generic Error
    if (error instanceof Error) return error.message;

    return 'An unexpected error occurred.';
}
