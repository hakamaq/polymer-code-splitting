import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';



import {helloworldTemplate} from '../../templates.js'
import {helloworldStyle} from '../../styles.js'
// import * as helloworldTemplate from './helloworld.html'

export default class HelloWorld extends PolymerElement {
  static get is(){return 'hello-world';}
  static get template() {
    return html([`<style>${helloworldStyle}</style>${helloworldTemplate}`]);

  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'World',
      },
    };
  }
}

