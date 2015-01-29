import {App} from 'app/routes/app';
import {expect, RouterStub} from './utils';

describe('the App module', () => {
  let sut;

  beforeEach(() => { sut = new App(new RouterStub()); });

  it('contains a router property', () => {
    expect(sut).to.have.property('router');
  });

  it('configures the routers title', () => {
    expect(sut.router.title).to.equal('Application Title');
  });
});