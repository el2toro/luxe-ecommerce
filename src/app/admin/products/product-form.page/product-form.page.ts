import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../../core/services/catalog.service';

interface Variant {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
}

@Component({
  selector: 'app-product-form.page',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './product-form.page.html',
  styleUrl: './product-form.page.scss',
})

export class ProductFormPage{
  private productService = inject(ProductService);
route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);

  isEdit = signal(false);
  images = signal<string[]>([]);
  arModel = signal<File | null>(null);
  sizes = ['XXS','XS','S','M','L','XL','XXL','One Size'];

  form = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    description: [''],
    price: [0, Validators.required],
    comparePrice: [0],
    category: [''],
    tags: [''],
    published: [false],
    variants: this.fb.array([])
  });

  variants = computed(() => this.form.get('variants')?.value || []);
  product!: Product;

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && id !== 'new') {
        this.isEdit.set(true);
        this.loadProduct(id);
      }
    });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.update(imgs => [...imgs, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.images.update(imgs => imgs.filter((_, i) => i !== index));
  }

  onARSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.arModel.set(file);
  }

  addVariant() {
    this.form.get('variants')?.value.push({ size: 'M', color: 'Black', colorHex: '#000000', stock: 10, sku: 'LUXE-001' });
  }

  removeVariant(index: number) {
    this.form.get('variants')?.value.splice(index, 1);
  }

  saveDraft() {
    console.log('Draft saved:', this.form.value, this.images(), this.arModel());
    alert('Product saved as draft!');
  }

  editProduct(){
    this.productService.updateProduct(this.product).subscribe({
    next: (updatedProduct) => this.router.navigate(['/admin/products'])
  });
  }

   createProduct(){
    this.product = this.mapFormToProduct();
    this.productService.createProduct(this.product).subscribe({
    next: (cretedProduct) => this.router.navigate(['/admin/products'])
  });
  }

  publish() {
    this.isEdit()
    ? this.editProduct()
    : this.createProduct()
  
    // console.log('Product published:', {
    //   ...this.form.value,
    //   images: this.images(),
    //   arModel: this.arModel()?.name
    // });
    // alert('Product published successfully!');
    
  }

  loadProduct(productId: string) {

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.product.imageFile = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    this.form.patchValue({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      published: true
    });
    this.images.set(['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']);
      }
    })
  }

  save(){

  }

  mapFormToProduct() : Product{
   return {
      id: null,
      name: this.form.get('name')?.value ?? '',
      description: this.form.get('description')?.value ?? '',
      price: this.form.get('price')?.value?.toString() ?? '',
      isAvailable: true,
      imageFile: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: this.form.get('rating')?.value ?? 5,
      sku: this.form.get('sku')?.value ?? '',   
      categories: []
   }
  }
}
