import { SetMetadata } from '@nestjs/common';
export const SignedInOnly = () => SetMetadata('SignedInOnly', true);
