import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch the user data from the API
    this.http
      .get<any>('https://reqres.in/api/users?page=1&per_page=6')
      .subscribe((response) => {
        this.users = response.data; // Store the data into the users array
      });
  }

  // Navigate to the user detail page
  viewUserDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
