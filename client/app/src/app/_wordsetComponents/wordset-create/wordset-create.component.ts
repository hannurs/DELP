import { ExerciseListDirective } from './../../exercise-list.directive';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseDirective } from './../../exercise.directive';
import { ExerciseItem } from './../../exercise-item';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { SetInfo } from './../../_interfaces/setInfo';
import { Wordset } from './../../_interfaces/wordset';
import { Set } from './../../_interfaces/set';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from './../../_services/message.service';
import { WordsetService } from '../../_services/wordset.service';
import { UserService } from './../../_services/user.service';
// import { WORDS } from './../words-mock';
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, QueryList, ViewContainerRef, AfterViewInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { send } from 'process';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit, AfterViewInit {

  constructor(
    private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  set: Set;
  exercise: ExerciseTemplateComponent;
  createExercise: any;

  exerciseInput: boolean;  
  
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  @ViewChildren(ExerciseListDirective) exerciseHosts: QueryList<ExerciseListDirective>;
  //proxy1: any; 

  ngOnInit(): void {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
    //this.proxy1 = new Proxy(this.exerciseHosts, {set: this.loadComponent2();}); 
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  newExercise(template: string) {
    switch (template) {
      case "WordExerciseTemplate":
        return new WordExerciseTemplateComponent();

      // case "TranslateSentenceExerciseTemplate":
      //   return new TranslateSentenceExerciseTemplateComponent();

      // case "FillSentenceExerciseTemplate":
      //   return new FillSentenceExerciseTemplateComponent();
    }
  }
  
  loadComponent(): void {
    this.exercise = new WordExerciseTemplateComponent();
    this.exercise.data = this.exercise;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.instance.data = this.exercise.data;    
  }

  loadComponent2(): void {
    if(this.exerciseHosts){
      let index = 0;
      this.exerciseHosts.forEach(ex => {
        const viewContainer = ex.viewContainerRef;
        viewContainer.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.set.exercises[index].component);
        const compRef = viewContainer.createComponent<ExerciseTemplateComponent>(factory);
        compRef.instance.data = this.set.exercises[index].data;
        index += 1;
      });
    }
  }
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplateComponent();
    this.loadComponent();
  }
  
  // createTranslateSentenceExercise(): void {
  //   this.exercise = new TranslateSentenceExerciseTemplateComponent();
  //   this.loadComponent();
  // }
  
  // createFillSentenceExercise(): void {
  //   this.exercise = new FillSentenceExerciseTemplateComponent();
  //   this.loadComponent();
  // }

  addExercise(): void {
    this.set.addExerciseToSet(this.exercise);
    this.createWordExercise(); 
    // this.loadComponent();
    // this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  saveSet(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(exerciseI: ExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  }
  
}
