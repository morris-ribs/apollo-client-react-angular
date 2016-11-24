import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

const CurrentDiscsForLayout = gql`
  query CurrentDiscsForLayout {
      discs {
          title
          artist
          year
          id
      }
  }
`;

@Component({
  selector: 'app-discs-page',
  templateUrl: './discs-page.component.html',
  styleUrls: ['./discs-page.component.css']
})
export class DiscsPageComponent implements OnInit {
  loading: boolean;
  discs: any;

  constructor(private apollo: Angular2Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: CurrentDiscsForLayout
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.discs = data.discs;
    });
  }

}
