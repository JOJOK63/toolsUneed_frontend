import {Component, OnInit} from '@angular/core';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categoryData: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((data:any) =>{
          this.categoryData = data;
          console.log(this.categoryData);
        })
    }

  editCategory() {

  }

  deleteCategory(categoryId : any) {
    const category = this.categoryData.find((c) => c.id === categoryId);

    if (!category) {
      alert("Category non trouvée");
      return;
    }


    if (confirm(`Êtes-vous sûr de vouloir supprimer ${category.name} ?`)) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert(`Suppression de la catégorie réussie`);
          // Retirer de la liste locale
          this.categoryData = this.categoryData.filter(t => t.id !== categoryId);
        },
        error: (err) => {
          switch(err.status) {
            case 409: // Conflict
              this.showError("Cette catégorie contient des sous-catégories");
              break;
            case 404: // Not Found
              this.showError("Catégorie non trouvée");
              break;
            default:
              this.showError("Erreur lors de la suppression");
          }
          console.log(err.status);
        }
      });
    }
  }

  showError(message: string) {
    alert(message);
  }
}
