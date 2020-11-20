import { ExerciseTemplateComponent } from './../exercise-template.component';
import { ExerciseDirective } from './../exercise.directive';
import { ExerciseItem } from './../exercise-item';
import { FillSentenceExerciseTemplateComponent } from './../fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../word-exercise-template/word-exercise-template.component';
import { WordsetService } from './../_services/wordset.service';
import { SetInfo } from './../_interfaces/setInfo';
import { Component, OnInit } from '@angular/core';
import { Set } from '../_interfaces/set';
import { DomSanitizer } from '@angular/platform-browser'
import { ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})

export class LessonCreateComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  set: Set;
  exercise: ExerciseTemplateComponent;
  createExercise: any;

  exerciseInput: boolean;  
  
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  ngOnInit(): void {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
  }
  
  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordExerciseTemplateComponent);
    console.log(this);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.instance.data = this.exercise.data; 
    console.log(this.exercise.data);
  }

  // deleteExercise(exercise: IExerciseTemplate): void {
  //   // TODO: implemantation of method
  // }
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplateComponent();
    this.exercise.template = "WordExerciseTemplate";
    this.exerciseInput = true;
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplateComponent();
    this.exercise.template = "TranslateSentenceExerciseTemplate";
    this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplateComponent();
    this.exercise.template = "FillSentenceExerciseTemplate";
    this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }

  /*addExerciseToSet(): void {
    console.log("no hej");
    this.exerciseInput = false;
    // this.exercise.addExerciseToSet(this.set);
  }

  saveLesson(): void {
    this.set.saveSet();
    console.log("lesson: ", this.set);
    this.wordsetService.saveWordset(this.set).subscribe( x=> {
      console.log("set id ", x);
    });
  }*/

  addExercise(): void {
    const tmp = new WordExerciseTemplateComponent();
    Object.assign(tmp.data, this.exercise.data)
    this.set.addExerciseToSet(tmp);
    //this.loadComponent();
  }

  saveLesson(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(): void {
    this.set.deleteExercise(this.exercise);
  }
}
