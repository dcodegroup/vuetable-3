# vuetable-3 - data table simplify!

## Fork

We have forked this package for the time being until the docs catch up. Credit to (https://github.com/mannyyang/vuetable-3)
## Versioning

Below is a table outlining the vue compatibility for the releases.

| Version/Release | Vue Compatibility | Vue Version       |
| -----------     | -----------       | -----------       |
| 6.x.x           | 3.x.x             | 3.x.x             |
| 5.x.x           | 3.x.x             | 2.x.x             |
| 4.x.x           | 2.x.x             | 2.x.x             |

# Documentation and Tutorial

You can find the documentation for vuetable-3 [here](https://mannyyang.github.io/vuetable-3/)

# Sample Codes

There are a bunch of examples in the [CodeSandbox](https://codesandbox.io/u/mannyyang/sandboxes), please have a look.

If you any question, please post your questions in the "Issues" section. Be sure to put the link to the appropriate CodeSandbox in question, or the one that you forked.

# Usage
## NPM

Vue 3.x.x (Ported Version, Full ESM with Vite)
```shell
npm install @dcodegroup-au/vuetable-3 --save
```

Vue 3.x.x Compatibility Mode
```shell
npm install @dcodegroup-au/vuetable-3@5.1.0 --save
```

Vue 2.x.x Compatibility
```shell
npm install @dcodegroup-au/vuetable-3@4.0.2 --save
```

# Contributions
Any contribution to the code must be done to the `next` branch.

Two builds are needed before publishing:

1. Library dist build: `npm run bundle`
2. Storybook prod build: `npm run storybook:build`

Then, use standard-version to commit a new version.

# License
Vuetable is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
