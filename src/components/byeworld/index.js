import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


import {byeTemplate} from '../../templates.js'
import {byeStyle} from '../../styles.js'
// import * as byeTemplate from './bye.html'
// import * as byeTemplate from './bye.html'

export default class ByeWorld extends PolymerElement {
  static get is(){return 'bye-world';}
  static get template() {
    return html([`<style>${byeStyle}</style>${byeTemplate}`]);
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

