import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepeComponent } from './reciepe.component';

describe('ReciepeComponent', () => {
  let component: ReciepeComponent;
  let fixture: ComponentFixture<ReciepeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciepeComponent]
    });
    fixture = TestBed.createComponent(ReciepeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
