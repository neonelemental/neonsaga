// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponents = (context) => {
  context.keys().forEach((fileName) => {
    // Get the component config
    const componentConfig = context(fileName);
    // Get the PascalCase version of the component name

    const componentName = upperFirst(
      camelCase(
        fileName.split('/').pop()
        // Remove the "./_" from the beginning
          .replace(/^\.\/_/, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    );
    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
};

let componentsContext = require.context('@components', true, /\.vue$/);
requireComponents(componentsContext);
let layoutsContext = require.context('@layouts', true, /\.vue$/);
requireComponents(layoutsContext);