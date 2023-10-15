import {
  Component, Input, OnInit,
} from '@angular/core';
import { RecipeSummary } from '../../../shared/models/recipe.summary';
import { RecipeService } from '../../../shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../core/services/loading.service';
import { PageEvent } from '../../../core/models/page.event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css'
  ]
})
export class SearchComponent implements OnInit {
  @Input() searchVisiable = true;
  searchResult: RecipeSummary[] = [];
  searchQuery: string = '';
  pageNumber: number = 1;
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 8;
  loading = false;
  imagesUrl = environment.ImagesUrl;

  constructor(
    private recipeService: RecipeService, 
    private loadingService: LoaderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('q') ?? '' ; 
      this.searchQuery = query;
      this.searchRecipes();
    });
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = Math.ceil(this.first / this.rows) + 1;
    this.searchRecipes();
  }

  searchRecipes(){
    if(this.searchQuery === '') return;
    this.loadingService.startLoading();
    this.recipeService.SearchRecipes(this.searchQuery,this.pageNumber, this.rows).subscribe(res =>{
      this.searchResult = res.items;
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
      this.loadingService.stopLoading();
    });
  }

  clear(){
    this.searchQuery = '';
  }

}

