import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import disc from './model/Disc';
import 'rxjs/add/operator/toPromise';

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

const submitNewDisc = gql`
  mutation CreateDiscMutation($input: CreateDisc!) {
    createDiscMutation(input: $input) {
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
  data: any;
  discs: [disc];
    public id: number;
    public title: string;
    public artist: string;
    public year: number;

  constructor(private apollo: Angular2Apollo) { }

  ngOnInit() {
    this.data = this.apollo.watchQuery({
      query: CurrentDiscsForLayout
    });
    this.data.subscribe(({data}) => {
      this.loading = data.loading;
      this.discs = data.discs;
    });
  }

  btnAdd(): void {
    let newDisc = new disc();
    newDisc.id = this.id;
    newDisc.title = this.title;
    newDisc.artist = this.artist;
    newDisc.year = this.year;
    // call the mutation in order to create the new disc
    this.apollo.mutate({ mutation: submitNewDisc, variables: { input: newDisc } }).toPromise().then(({ data }) => {
      console.log('got data', data);
      this.data.refetch();
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });

    this.id = null;
    this.title = null;
    this.artist = null;
    this.year = null;
  }

}
