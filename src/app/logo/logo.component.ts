import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  viewProviders: [ DragulaService ]
})
export class LogoComponent {

  leftColor: string;
  rightColor: string;
  textColor: string;
  colorDragging: boolean;
  buttonClicked: boolean;

  constructor( private dragulaService: DragulaService) {
    this.leftColor = '#F44336';
    this.rightColor = '#D32F2F';
    this.textColor = '#FFFFFF';

    dragulaService.setOptions('shield', {
      moves: function (el, source, handle, sibling) {
        switch (el.id) {
          case 'left':
          case 'right':
          case 'text':
            return false;
          default:
            return true;
        }
      },
      accepts: function (el, target, source, sibling) {
        switch (target.id) {
          case 'left':
          case 'right':
          case 'text':
            return true;
          default:
            return false;
        }
      },
      copy: true
    });

    dragulaService.drag.subscribe((value) => {
      this.colorDragging = true;
    });

    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });

    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });

    dragulaService.drop.subscribe((value) => {
      this.colorDragging = false;
      this.buttonClicked = false;
      this.onDrop(value.slice(1));
    });
  }

  private onOver(args) {
    let [e, el] = args;
    el.style.opacity = 1;
  }

  private onOut(args) {
    let [e, el] = args;
    el.style.opacity = '';
  }

  private onDrop(args) {
    let [e, el] = args;
    if (el) {
      el.removeChild(e);
      el.style.fill = e.id;
    }
  }
}
