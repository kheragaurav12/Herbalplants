import { Component, OnInit } from '@angular/core';
import {
  collection,
  getDocs,
  getFirestore,
  Firestore,
  doc,
} from 'firebase/firestore/lite';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css'],
})
export class PlantsComponent implements OnInit {
  selectedCategory: number = 0;
  plantCategories: any[] = [{ categoryId: '', categoryName: 'All' }];
  plants: any[] = [];
  tempPlants: any[] = [];

  constructor(private db: DataService) {}

  async ngOnInit() {
    let dbRef = getFirestore(this.db.app);

    let plantCategoryRef = collection(dbRef, 'product-categories');
    getDocs(plantCategoryRef).then((res) => {
      let categoryArr = res.docs.map((e) => e.data());
      this.plantCategories.push(...categoryArr);
    });

    let plantRef = collection(dbRef, 'products');
    this.plants = (await getDocs(plantRef)).docs.map((e) => e.data());
    this.tempPlants = [...this.plants];
  }

  filterData(value, idx) {
    this.selectedCategory = idx;
    if (value === '') {
      this.plants = [...this.tempPlants];
    } else {
      this.plants = this.tempPlants.filter(
        (x) => x.category.categoryId === value
      );
    }
  }

  searchPlant(event) {
    let value = event.target.value;
    if (value === '') {
      this.plants = [...this.tempPlants];
    } else {
      this.plants = this.tempPlants.filter(
        (x) =>
          x.plantName.toLowerCase().includes(value.toLowerCase()) ||
          x.scientificName.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
