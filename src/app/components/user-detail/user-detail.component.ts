import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.http
      .get<any>(`https://reqres.in/api/users/${userId}`)
      .subscribe((response) => {
        this.user = response.data;
      });
  }
}
