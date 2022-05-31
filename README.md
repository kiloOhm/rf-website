# RF Website Usage Manual

This website is hosted for free at [Render.com](https://render.com)

Any changes that are committed to the **master** branch of this repository will be automatically applied after a couple of minutes

---
There is a secondary branch called **develop**. This branch is hosted [here](https://rf-website-pr-1.onrender.com)

Any changes that are committed to this branche will also be applied automatically

## Making changes

You can find all of the relevant files in the *public* folder of this repository. If you edit any other files, things could break.

To edit a file, open it and then click the **pencil** symbol on the top right.

---
Markdown files (.md) have a special syntax and can do some cool things. Most importantly, paragraphs are seperated by empty lines.

(Don't use the preview tab, it does not represent how the final result will look like)

You can input images with `![alt text](image.jpg)` - images in the public folder can be referenced like this: `![harold](/harold.jpeg)`

To add an empty line, put this at the start of the line: `&nbsp;` - markdown will ignore actual empty lines

Markdown files can contain html, but anything inside must also be html. markdown syntax won't work insite html.

[Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Subtitles

The rolling subtitles on the home page can be edited in the *Subtitles.txt* file. Nothing special here. They are read line by line and loop infinitely

## Plugins

The plugins page can be edited in the *Plugins.md* file. Each section begins with a `# Header` and is immediately followed by an image `![harold](/harold.jpeg)`

If you want to supply additional information in a popup, input a link like `[Connect](plugins/modal/test-2)` - clicking on this link will navigate to the **plugins** page in the backgroud and display the **test-2** popup on top.

## Popups

Popups can be defined in the *Modals.md* file. Each popup begins with a `# Header` - The `Header` part can be referenced in a link like shown above. 

You can use links in popups but <ins>you can't open another popup on top!</ins>

## Media

The media image sliders are generated based on the structure inside the *media* folder. Any images at the root of the folder will be shown in the first slider, after that the numbering like `1-Cool builds` will determine the order.

(When testing locally, you need to run `npm run index` (in a wsl console if you're on windows) after each change to enable the program to detect the files)
