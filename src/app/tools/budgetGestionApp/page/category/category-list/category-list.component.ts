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
          console.error('Erreur complète:', err); // ← Ajoute ça
          console.log('Status:', err.status);     // ← Et ça
          console.log('Error body:', err.error);  // ← Et ça aussi

          if (err.status === 400) {
            alert(err.error);
          } else {
            alert("Erreur lors de la suppression");
          }
        }
      });
    }

  }
}
