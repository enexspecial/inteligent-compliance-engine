import { AuthService } from './auth.service';
import { JobsService } from '../jobs/jobs.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { NotificationType } from '@compliance-engine/shared-types';
export declare class AuthController {
    private readonly authService;
    private readonly jobsService;
    constructor(authService: AuthService, jobsService: JobsService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: NotificationType;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(req: any): any;
    startDocumentWorkflow(req: any, documentData: any): Promise<{
        success: boolean;
        message: string;
        jobs: {
            processing: string;
            analysis: string;
            notification: string;
        };
        userId: any;
    }>;
}
