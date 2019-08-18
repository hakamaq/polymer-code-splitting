import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';



// import {helloworldTemplate} from '../../template.js'
import * as helloworldTemplate from './helloworld.html'

export default class HelloWorld extends PolymerElement {
  static get is(){return 'hello-world';}
  static get template() {
    return html([`${helloworldTemplate}`]);

  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'hello-world',
      },
    };
  }
}

