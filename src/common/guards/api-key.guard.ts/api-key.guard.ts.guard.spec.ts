import { ApiKeyGuard } from './api-key.guard.ts.guard';

describe('ApiKeyGuardTsGuard', () => {
  it('should be defined', () => {
    expect(new ApiKeyGuard()).toBeDefined();
  });
});
