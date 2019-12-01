import { AttachHostNamePipe } from './attach-host-name.pipe';

describe('AttachHostNamePipe', () => {
  it('create an instance', () => {
    const pipe = new AttachHostNamePipe();
    expect(pipe).toBeTruthy();
  });
});
