import { TaskManagementPage } from './app.po';

describe('task-management App', () => {
  let page: TaskManagementPage;

  beforeEach(() => {
    page = new TaskManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
