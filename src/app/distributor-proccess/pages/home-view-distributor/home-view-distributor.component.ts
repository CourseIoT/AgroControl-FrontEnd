import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProductService } from '../../../store/services/product.service';
import { ProductStoredService } from '../../../store/services/product-stored.service';
import { Product } from '../../../store/models/product.entity';
import { ProfileService } from '../../../profile-management/services/profile.service';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home-view-distributor',
  standalone: true,
  imports: [CommonModule, MatIcon,MatIconModule,TranslateModule ],
  templateUrl: './home-view-distributor.component.html',
  styleUrl: './home-view-distributor.component.css'
})
export class HomeViewDistributorComponent implements OnInit {
  private productService = inject(ProductService);
  private productStoredService = inject(ProductStoredService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  userId!: number;
  displayName: string | null = null;

  totalProducts = 0;
  totalStock = 0;
  totalSales = 0;
  totalRevenue = 0;
  recentSales: any[] = [];
  lowStockProducts: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id, 10);
      this.loadProfile();
      this.loadDashboardData();
    }
  }

  private loadProfile(): void {
    this.profileService.getDistributorByUserId(this.userId).subscribe({
      next: (profile) => {
        this.displayName = profile.fullName;
      },
      error: () => {
        this.displayName = null;
      }
    });
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Cargar productos
    this.productService.getAllByUserId(this.userId).subscribe({
      next: (products: Product[]) => {
        this.totalProducts = products.length;
        this.totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

        this.lowStockProducts = products
          .filter(p => p.quantity < 10)
          .sort((a, b) => a.quantity - b.quantity)
          .slice(0, 5);

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });

    this.productStoredService.getAllByOwnerId(this.userId).subscribe({
      next: (sales: any[]) => {
        this.totalSales = sales.length;
        this.totalRevenue = sales.reduce((sum, s) => sum + s.totalCostProduct, 0);

        this.recentSales = sales
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getStockStatusColor(quantity: number): string {
    if (quantity === 0) return 'text-red-600';
    if (quantity < 10) return 'text-orange-600';
    return 'text-green-600';
  }

  getStockStatusText(quantity: number): string {
    if (quantity === 0) return 'Agotado';
    if (quantity < 10) return 'Stock bajo';
    return 'Stock normal';
  }
  goToInventory(): void {
    this.router.navigate(['/home-distributor', this.userId, 'your-products']);
  }

  goToSalesHistory(): void {
    this.router.navigate(['/home-distributor', this.userId, 'sale-history']);
  }
}
