import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

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
export class ProductFormPage {
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

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && id !== 'new') {
        this.isEdit.set(true);
        this.loadProduct(+id);
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

  publish() {
    console.log('Product published:', {
      ...this.form.value,
      images: this.images(),
      arModel: this.arModel()?.name
    });
    alert('Product published successfully!');
    this.router.navigate(['/admin/products']);
  }

  loadProduct(id: number) {
    // Mock data
    this.form.patchValue({
      name: 'Cashmere Wool Coat',
      brand: 'ATELIER NOIR',
      price: 4800,
      published: true
    });
    this.images.set(['https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=800']);
  }

  save(){

  }
}
