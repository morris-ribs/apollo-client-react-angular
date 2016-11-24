import { ApolloClientAngularExamplePage } from './app.po';

describe('apollo-client-angular-example App', function() {
  let page: ApolloClientAngularExamplePage;

  beforeEach(() => {
    page = new ApolloClientAngularExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
