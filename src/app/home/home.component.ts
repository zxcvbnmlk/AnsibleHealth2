import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import {products} from "@app/home/products";
import {AxisLabelVisualArgs, SeriesLabels, LegendItemVisualArgs} from '@progress/kendo-angular-charts';
import { Path, Text, Group, geometry, Element, Rect as RectShape } from '@progress/kendo-drawing';
const { Point, Rect, Size } = geometry

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

  public data = [
    { name: '2018', type: 'line', data: [123, 276, 310, 212, 240, 156, 98] },
    { name: '2019', type: 'line', dashType: 'dashdot', data: [165, 210, 287, 144, 190, 167, 212] },
    { name: '2020', type: 'line', data: [56, 140, 195, 46, 123, 78, 95] }
  ];

  // public seriesLabels: SeriesLabels = {
  //   visible: true, // Note that visible defaults to false
  //   padding: 3,
  //   // border: {color: '#000', width: 2},
  //   color: '#0a0',
  //   font: 'bold 12px Arial, sans-serif'
  // };
  public labelContent = (e: any) => {
    console.log('e', e);
    //  e.value =  e.value + '%';
    if(e.value > 40){
      // e.series.color = 'red'
    }

    return e.value + '';
  }

  public labelVisual = (e: AxisLabelVisualArgs) => {
    const defaultLabel = e.createVisual();
    console.log('defaultLabel[\'children\'][1]', defaultLabel);
    defaultLabel['children'][1].options.fill.color = '#3FCF81';
    defaultLabel['children'][1].options.font = 'bold 14px Nunito, sans-serif';

    if (e.value > 90) {
      return defaultLabel;
    }
    defaultLabel['children'][1].options.fill.color = '#FF5B6F';
    return defaultLabel;
  }
  public labelsVisual(args: LegendItemVisualArgs): Element {
    if (args.series.name === '2019') {
      // Create rectangular shape on top of which the label will be drawn
      const rectOptions = { stroke: { width: 2, color: '#fff' }, fill: { color: '#fff' } };
      const rectGeometry = new Rect(new Point(0, 3), new Size(60, 10));
      const rect: RectShape = new RectShape(rectGeometry, rectOptions);

      // Create the lines used to represent the custom legend item
      const pathColor = args.options.markers.border.color;
      const path1 = new Path({
        stroke: {
          color: pathColor,
          width: 3
        }
      });

      const path2 = new Path({
        stroke: {
          color: pathColor,
          width: 3
        }
      });

      // The paths are constructed by using a chain of commands
      path1.moveTo(0, 7).lineTo(10, 7).close();
      path2.moveTo(15, 7).lineTo(25, 7).close();

      // Create the text associated with the legend item
      const labelText = args.series.name;
      const labelFont = args.options.labels.font;
      const fontColor = args.options.labels.color;
      const textOptions = { font: labelFont, fill: { color: fontColor } };
      const text = new Text(labelText, new Point(27, 0), textOptions);

      // Place all the shapes in a group
      const group = new Group();

      group.append(rect, path1, path2, text);

      // set opacity if the legend item is disabled
      if (!args.active) {
        group.opacity(0.5);
      }

      return group;
    }
    // return the default visualization of the legend items
    return args.createVisual();
  }



    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}
