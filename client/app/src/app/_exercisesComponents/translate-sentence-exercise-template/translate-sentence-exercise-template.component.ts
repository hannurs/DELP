import { View, ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { Set } from './../../_interfaces/set';
import { Component, Input, OnInit, Type } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-translate-sentence-exercise-template',
  templateUrl: './translate-sentence-exercise-template.component.html',
  styleUrls: ['./translate-sentence-exercise-template.component.css']
})
export class TranslateSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

    constructor(public userService: UserService) {
        this.template = "TranslateSentenceExerciseTemplate";
        this.component = TranslateSentenceExerciseTemplateComponent;
        this.data = this;

        this.viewOption = new View(ViewOption.Create);
        }

    url: string;

    template: "TranslateSentenceExerciseTemplate";
    oryginalSentence: string;
    translatedSentence: string;
    answer: string;

    @Input() data: any = this;
    component: Type<any>;
    viewOption: any;
    ViewOption = ViewOption;

    id: number;
    videoPath: string;
    audioPath: string;
    picturePath: string;

    // public addExerciseToSet(set: Set) {
    //     // super.addExerciseToSet(set);
    //     this.template = "TranslateSentenceExerciseTemplate";
    //     let exerciseCopy = new TranslateSentenceExerciseTemplateComponent();
    //     let sth = Object.assign(exerciseCopy, this);
        
    //     set.exercises.push(exerciseCopy);
    // }

    setViewOption(view: ViewOption) {
      this.viewOption.type = view;
    }

    setUrl(url: string) {
      this.url = url;
    }

    toJSON() {
        return {
          "id": this.id,
          "template": this.template,
          "oryginalSentence": this.oryginalSentence,
          "translatedSentence": this.translatedSentence,
      }
    }

    checkAnswer(): boolean {
      if (this.data.answer == this.translatedSentence)
      {
        return true;
      }
      else return false;
    }

    showHint(): string {
      return this.translatedSentence;
    }
    removeError(idclass:string){
      $(idclass).removeClass('bg-error')
    }
}
