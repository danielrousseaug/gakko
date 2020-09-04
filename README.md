# Gakkō

Gakko is an electron application designed to help students with organizing their digital learning platforms.

## Getting Started

I am a user: Install the latest [release](https://github.com/danielrousseaug/gakko/releases) from the releases section.

I am a develeoper: Download and run the code by following the installation steps below.

## Installation
NOTE: Make sure you have NPM/NodeJS before installing
use 
```bash
git clone https://github.com/danielrousseaug/gakko
cd gakko
```
wherever you want to have the program, then do
```bash
npm init
```
choose the default to all the prompts, then do
```bash
npm install electron --save-dev
```
to install dependencies.
Then either use `npm start` to run from a commandline, or package into an application using 'npm install electron-packager -g` and then `electron-packager . Gakko`
## Usage

![Menu](https://i.imgur.com/3BM8qWF.png)
Select from 3 current features: Notes, Schedules and Calendar

![Notes](https://i.imgur.com/AzkFzvZ.png)
Notes functions as a simplistic todo list

![Schedule](https://i.imgur.com/0EkHUQH.gif)

Schedule works as a way to organize your classes and their respective zoom links. To edit any of the classes name or link, simply press the edit button, modify them, and click the save changes button.

## Contributing
Pull requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
