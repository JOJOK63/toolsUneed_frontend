import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SubCategoryService} from '../../../service/sub-category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubCategory} from '../../../model/SubCategory';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-new-sub-category',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-sub-category.component.html',
  styleUrl: './new-sub-category.component.css'
})
export class NewSubCategoryComponent implements OnInit {
  subCategoryForm: FormGroup;
  isEditMode: boolean = false;
  subCategoryId: number | null = null;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService : CategoryService
  ) {
    this.subCategoryForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit() {
      this.subCategoryId = Number(this.route.snapshot.paramMap.get('id'));

      this.loadCategoriesData();

      if(this.subCategoryId) {
        this.isEditMode = true;
        this.loadSubCategoryData();

      }
  }

  onSubmit() {

  }

  resetForm(){
    this.subCategoryForm.reset();
    this.loadSubCategoryData();
  }

  private loadSubCategoryData() {
    this.subCategoryService.getSubCategoryById(this.subCategoryId!).subscribe({
      next: (subCategory: SubCategory) => {
        console.log(subCategory);
        this.subCategoryForm.patchValue({
          name: subCategory.name,
          icon: subCategory.icon,
          category: subCategory.category.id
        });
      },
      error: (error) => console.error('Erreur de chargement ', error)
    });
  }

  private loadCategoriesData() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        console.log(this.categories);
        this.categories = categories;
      },
      error: (error) => console.error('Erreur de chargement des catégories', error)
    });
  }

}
