## Purpose

 This script was implemented in order to facilitate the 
 [migration](https://github.com/strongloop/loopback.io/issues/29)
 of 
 [strongloop/loopback](https://github.com/strongloop/loopback) 
 Confluence documentation to Jekyll templates.  

## Converter

 Written using `Node v4.4.3`, it performs the conversion as a flow of tasks.

### How to run the script

```
npm install
node . {PATH_TO_ORIGINAL_CONTENT} {OUTPUT_PATH}
```

### Flow based converter

 As many people offered their help on the forum topic, the converter should enable parallel team work.

 The approach taken here splits each conversion task to a separate flow step.

#### Global flow

 The steps in `src/global-flow` handle the global tasks in this sequence:

 * Reads the page hierarchy, provides:
    * List of files to convert
    * Hierarchical page structure
 * Updates the files metadata and define destination file path 
 * Calls the conversion flow on each page file (see below [Content conversion flow](#content-conversion-flow)) 
 * Builds and writes the side menu based on the page hierarchy

#### Content Conversion flow

 Located under `src/content-conversion-flow`.
 Each step performs a task on the content and calls the next one.

 This flow is executed sequentially **once per file**:

 * Reads the original content
 * Finds the attachment pictures, updates the `src` attribute and write the file on the new location  
 * HTML to MD
   * link tags
   * image tags
   * content only and black list tags cleaning  
   * tables, left as HTML for readability, cleans and beautify code
   * code blocks, if multiline, tags as JS and **beautify** if it passes JSON or JS validation 
   * Confluence info macros (hint, success, problem, warning) to Jekyll include  
   * hidden review comments left in `div.sl-hidden` but as **beautified** HTML   
 * Builds the front matter
 * Writes the converted content

## Tests

```shell
 ./scripts/watch.sh ./tests/{path-to-test-file}.js
```

## Useful links
* [Migrate Confluence content to markdown #29](https://github.com/strongloop/loopback.io/issues/29)
* [Forum topic](https://groups.google.com/forum/#!topic/loopbackjs/SCx58Gmv-y4)
* [Conversion-rules](https://github.com/strongloop/loopback.io/wiki/Conversion-rules)
