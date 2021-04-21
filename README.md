# protosprites-builder

Given a directory `sprites` of SVG files, outputs an HTML file destined for the protosprites parser at https://github.com/protomaps/protosprites/.

Quick run example:

```sh
npm install
npm start -- example
```

To assemble SVGs in a given directory:

```sh
npm start -- [directory]
```

This outputs the file `build/[directory].html`.

## TODO
- Validate SVG format
