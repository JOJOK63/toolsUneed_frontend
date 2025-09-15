import { Component } from '@angular/core';
import {SubCategory} from '../../../model/SubCategory';
import {SubCategoryService} from '../../../service/sub-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sub-category-list',
  imports: [],
  templateUrl: './sub-category-list.component.html',
  styleUrl: './sub-category-list.component.css'
})
export class SubCategoryListComponent {
  subCategoriesData: SubCategory[] = [];

  constructor(private subCategoryService: SubCategoryService,private router: Router) {
  }

  ngOnInit() {
    this.subCategoryService.getAllSubCategories().subscribe(
      subCategories => {
        this.subCategoriesData = subCategories;
      }
    )
  }

  deleteSubCategory(id: any) {
    console.log(id);
    if(id != null){
      this.subCategoryService.deleteSubCategory(id).subscribe(
        ()=>{
          this.ngOnInit();
        }
      )
    }
  }

  editSubCategory(id: any) {
    if(id){
      this.router.navigate(['/sub-category/edit',id]);
    }
  }


}
