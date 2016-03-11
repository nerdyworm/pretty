#! /usr/bin/env node

var Highlights = require('highlights');
var highlighter = new Highlights();

highlighter.requireGrammarsSync({
  modulePath: require.resolve('language-handlebars/package.json')
});

highlighter.requireGrammarsSync({
  modulePath: require.resolve('language-sass/package.json')
});

highlighter.requireGrammarsSync({
  modulePath: require.resolve('language-sql/package.json')
});

var scopes = {
  'hbs': 'text.html.handlebars',
  'go': 'source.go',
  'js': 'source.js',
  'scss': 'source.css.scss',
  'sql': 'source.sql'
};

process.stdin.resume();
process.stdin.setEncoding('utf8');
fileContents = '';

process.stdin.on('data', function(chunk) {
  fileContents += chunk.toString();
});

process.stdin.on('end', function() {
  var html = highlighter.highlightSync({
    fileContents: fileContents,
    scopeName: scopes[process.argv[2]],
  });

  console.log(html);
});

