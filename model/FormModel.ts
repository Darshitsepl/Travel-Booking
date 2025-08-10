export interface LoginFormValues {
    name: string;
    email: string;
    password:string;
}

export interface ForgotPasswordFormValues {
    email: string;
}

export interface ResetPasswordFormValues {
    newPassword: string;
    confirmPassword: string;
}