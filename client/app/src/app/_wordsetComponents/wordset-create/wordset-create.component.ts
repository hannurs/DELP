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
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { send } from 'process';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  set: Wordset;
  exercise: WordExerciseTemplateComponent;

  //@Input() exerciseItems: ExerciseItem[];
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  ///////////
  @ViewChildren(ExerciseDirective) exerciseHosts: QueryList<ExerciseDirective>;
  ///////////

  

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = Array<WordExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    
    // this.exerciseItems = new Array<ExerciseItem>(); 
    this.loadComponent();
  }

  loadComponent(): void {
    let tmp = new WordExerciseTemplateComponent();
    Object.assign(tmp, this.exercise);
    this.exercise = new WordExerciseTemplateComponent();
    Object.assign(this.exercise, tmp);
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    console.log(this);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.instance.data = this.exercise.data; 
    // console.log(this.exercise.data);

    if (this.exerciseHosts) {

      let index = 0;
      this.exerciseHosts.toArray().forEach(ex => {
        // console.log("this.exerciseHosts.length", this.exerciseHosts.length);
        // console.log("index", index);
        let currExercise = new WordExerciseTemplateComponent();
        Object.assign(currExercise, this.set.exercises[index++]);
        // let currExercise = this.set.exercises[index++];
        const viewContainer = ex.viewContainerRef;
        viewContainer.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(currExercise.component);
        const compRef = viewContainer.createComponent<ExerciseTemplateComponent>(factory);
        console.log("currExercise", currExercise);
        compRef.instance.data = currExercise.data;
        // index++;
      });
    }

    // const componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);


  }


  addExercise(): void {
    const tmp = new WordExerciseTemplateComponent();
    Object.assign(tmp, this.exercise);
    this.set.addExerciseToSet(tmp);
    this.loadComponent();
  }

  saveSet(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(exerciseI: WordExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  }
  
}
