import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { IndexComponent } from "./index/index.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { ViewComponent } from "./view/view.component";
import {MatCardModule } from "@angular/material/card";
import {CardModule} from "primeng/card"
import {ButtonModule} from "primeng/button"
import {MatSelectModule} from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';;


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    
  ],
  //providers:[AddRecipeService]
  
})
export class RecipeManagementModule { }
