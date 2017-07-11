import { AmaranthPage } from './app.po';

describe('amaranth App', () => {
  let page: AmaranthPage;

  beforeEach(() => {
    page = new AmaranthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
