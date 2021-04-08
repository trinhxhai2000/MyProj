import { MyProjTemplatePage } from './app.po';

describe('MyProj App', function() {
  let page: MyProjTemplatePage;

  beforeEach(() => {
    page = new MyProjTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
