import { AfterViewInit, Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category, Product } from '../../shared/models/product';
import { ItemsService } from '../../shared/services/items.service';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Employee } from '../../shared/models/user';

@Component({
  selector: 'org-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  addFormGroup;
  editFormGroup;

  products: Product[] = [];
  public currentEmployee?: Employee;
  public editingProducts?: Product;
  category: Category[] = [
    Category.headphones,
    Category.speakers,
    Category.earphones,
  ];

  constructor(
    formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private authService: AuthService
  ) {
    this.addFormGroup = formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      imageThumbnail: ['', Validators.required],
      img: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.editFormGroup = formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      imageThumbnail: ['', Validators.required],
      img: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  addProduct() {
    const value = this.addFormGroup.value;

    if (!this.addFormGroup.valid) {
      return;
    }
    this.itemsService
      .addProduct({
        id: uuidv4(),
        name: value.name || '',
        category: value.category || '',
        summary: value.summary || '',
        description: value.description || '',
        img: value.img || '',
        imageThumbnail: value.imageThumbnail || '',
        price: value.price || '',
        status: 2,
      })
      .subscribe(
        (d) => {
          this.currentEmployee = this.authService.getUserInfo();
          if (this.currentEmployee === undefined) {
            return;
          }
          this.currentEmployee.products.push(d.id);
          this.updateUser(this.currentEmployee);
          this.loadProducts();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  updateUser(user: Employee) {
    this.authService.updateUser(user).subscribe((d) => {
      this.currentEmployee = user;
    });
  }

  editProducts(product: Product) {
    this.editingProducts = product;
    this.editFormGroup.setValue({
      name: this.editingProducts?.name,
      category: this.editingProducts?.category,
      summary: this.editingProducts?.summary,
      description: this.editingProducts?.description,
      img: this.editingProducts?.img,
      imageThumbnail: this.editingProducts?.imageThumbnail,
      price: this.editingProducts?.price,
    });
  }

  cancelEditProducts() {
    this.editingProducts = undefined;
  }

  updateProduct() {
    this.itemsService
      .updateProduct({
        id: this.editingProducts!.id,
        name: this.editFormGroup.value.name!,
        category: this.editFormGroup.value.category!,
        summary: this.editFormGroup.value.summary!,
        description: this.editFormGroup.value.description!,
        img: this.editFormGroup.value.img!,
        imageThumbnail: this.editFormGroup.value.imageThumbnail!,
        price: this.editFormGroup.value.price!,
        status: 1,
      })
      .subscribe((d) => {
        this.editingProducts = undefined;
        this.loadProducts();
      });
  }

  deleteProduct(id: string) {
    this.itemsService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.itemsService.getProducts().subscribe((d) => {
      this.products = d;
    });
  }

  activateProduct(product: Product) {
    product.status = 2;
    this.updateStatusProduct(product);
  }

  blockPriduct(product: Product) {
    product.status = 1;
    this.updateStatusProduct(product);
  }

  updateStatusProduct(product: Product) {
    this.itemsService.updateProduct(product).subscribe((d) => {
      console.log(d);
    });
  }

  searchField = new FormControl('');
  searchText$ = new BehaviorSubject<string | null>('');
  searchResults$!: Observable<Product[]>;

  searchFieldStatus = new FormControl('');
  searchTextStatus$ = new BehaviorSubject<string | null>('');
  searchResultsStatus$!: Observable<Product[]>;

  ngOnInit(): void {
    this.loadProducts();

    this.searchResults$ = this.searchText$.pipe(
      switchMap((query) => this.itemsService.findProductByName(query || ''))
    );

    this.searchField.valueChanges.subscribe(this.searchText$);

    this.searchResultsStatus$ = this.searchTextStatus$.pipe(
      switchMap((query) => this.itemsService.findProductByStatus(query || ''))
    );

    this.searchFieldStatus.valueChanges.subscribe(this.searchTextStatus$);
  }

  ngAfterViewInit(): void {
    new FroalaEditor('#editor', {
      theme: 'dark',
    });
  }
}
