import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import {products} from "@app/home/products";
import {AxisLabelVisualArgs, SeriesLabels} from '@progress/kendo-angular-charts';
import { Group, Path } from '@progress/kendo-drawing';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    loading = false;
    currentUser: User;
    userFromApi: User;
    public gridData: any[] = products;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }


  public seriesData: number[] = [91, 95, 92, 84, 81];
  public categories: string[] = ['01.02', '02.02', '03.02', '04.02', '05.02'];

  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    // border: {color: '#000', width: 2},
    color: '#0a0',
    font: 'bold 12px Arial, sans-serif'
  };
  public labelContent = (e: any) => {
    console.log('e', e);
    //  e.value =  e.value + '%';
    if(e.value > 40){
      // e.series.color = 'red'
    }

    return e.value + '';
  }

  public labelVisual = (e: AxisLabelVisualArgs) => {
    console.log('e',e);
    e.options.color = 'green';
    const defaultLabel = e.createVisual();

    console.log('defaultLabel', defaultLabel);
    if (e.value > 90) {
      return defaultLabel;
    }

    const path = new Path({
      stroke: {
        color: 'green',
        width: 1
      }
    });

    const bbox = defaultLabel.bbox();
    path.moveTo(bbox.bottomLeft()).lineTo(bbox.bottomRight());

    const group = new Group();
    group.append(defaultLabel, path);
    console.log('group', group);
    return group;
  }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}
