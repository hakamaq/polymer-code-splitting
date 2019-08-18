import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


// import {byeTemplate} from '../../template.js'
import * as byeTemplate from './bye.html'

export default class ByeWorld extends PolymerElement {
  static get is(){return 'bye-world';}
  static get template() {
    return html([`${byeTemplate}`]);
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Bye :(',
      },
    };
  }
}

