import { AasiDashboardAppPage } from './app.po';

describe('aasi-dashboard-app App', () => {
  let page: AasiDashboardAppPage;

  beforeEach(() => {
    page = new AasiDashboardAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
