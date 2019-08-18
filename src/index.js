import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import '@polymer/iron-demo-helpers/demo-snippet';

import  HelloWorld  from './components/helloworld';
import  ByeWorld  from './components/byeworld';

// add custom elements here
const elements = {
    HelloWorld,
    ByeWorld
};

    
for (const el of Object.keys(elements)) {
    const item = elements[el];
    customElements.define(item.is, item);
}