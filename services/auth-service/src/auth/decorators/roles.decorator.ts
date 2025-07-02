import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@compliance-engine/shared-types';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles); 