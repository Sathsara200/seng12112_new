import { TestBed } from '@angular/core/testing';
import { App } from '../../app';

// Make sure './app.ts' exports 'App', or import the correct member

// If './app.ts' does not export 'App', update this import to match the actual export, e.g.:
// import App from './app';
// or
// import { ActualExportedName } from './app';

describe('App', () => {
  let service: App;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(App);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
