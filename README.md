# Polymer Code Splitting

This repo uses gulp to split the HTML, CSS from JS. In the `src\components\helloworld` folder has three files, HTML, SCSS and JS which will convert the SCSS to CSS then export as template string in JS. This allows to import the template string in JS without any issues for polymer.

## Getting Started

1) Run `npm i` - This installs all the dependecies
2) Run `npm  run build` - To run gulp initially.
   Or run `npm start` - To run the build command and start browser sync to start watching the files.

## Viewing Your Element

You can view your polymer by runing `$ polymer serve`

However you need to run `npm run build` to run gulp first.

## Running Tests

```
$ polymer test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
