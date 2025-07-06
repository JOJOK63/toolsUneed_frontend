import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMonsterComponent } from './new-monster.component';

describe('NewMonsterComponent', () => {
  let component: NewMonsterComponent;
  let fixture: ComponentFixture<NewMonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMonsterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
