module.exports = function (grunt) {

   var timestamp = Date.now();

   //@todo; possibly grab major/minor/build/revision from build.proj instead of package.json
   //var parseXML = require('node-xml-lite').parseString;
   //var webConfigDoc = parseXML(grunt.file.read('../../build.proj'));

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   // Time how long tasks take. Can help when optimizing build times
   require('time-grunt')(grunt);

   grunt.initConfig({
      baseDir: 'obj/Release/Package',
      pkg: grunt.file.readJSON('package.json'),

      //Create resource arrays for replace task
      jsAppResources: [],
      jsVendResources: [],
      jsVendNCResources: [],
      cssVendResources: [],

      clean: {
         build: {
            files: [{
               dot: true,
               src: [
                  '<%=baseDir%>/build/**/*'
               ]
            }]
         }
      },
      copy: {
         build: {
            files: [
               {
                  cwd: '<%=baseDir%>/PackageTmp/',
                  dest: '<%=baseDir%>/build/',
                  expand: true,
                  src: [ './**', './**/*.js', '!./ui/lib/**', './ui/app/custom.js', './ui/app/extensions.js' ]
               }
            ]
         },
         hl: {
            files: [
               {
                  dest: '<%=baseDir%>/build/ui/lib/cultures',
                  src: [ '<%=baseDir%>/PackageTmp/ui/lib/soho/js/cultures/**' ],
                  expand: true,
                  flatten: true
               },
               {
                  dest: '<%=baseDir%>/build/ui/lib/soho/css',
                  src: [ '<%=baseDir%>/PackageTmp/ui/lib/soho/css/*-theme.min.css' ],
                  expand: true,
                  flatten: true
               },
               {
                  dest: '<%=baseDir%>/build/ui/lib',
                  src: [ '<%= jsVendNCResources %>' ],
                  expand: true,
                  flatten: true
               }
            ]
         },
         deploy: {
            files: [
               {
                  cwd: '<%=baseDir%>/',
                  dest: '../../Builds/',
                  expand: true,
                  src: [ './*.zip' ]
               },
               {
                  cwd: '<%=baseDir%>/',
                  dest: '../../Builds/',
                  expand: true,
                  src: [ './build/**' ]
               }
            ]
         }
      },
      replace: {
         gather: {
            files: [
               {
                  cwd: '<%=baseDir%>/PackageTmp/ui/app/',
                  dest: '<%=baseDir%>/build/ui/app/',
                  expand: true,
                  src: [ 'index.html' ]
               }
            ],
            options: {
               //@todo; create function to minimize repition
               patterns: [
                  {
                     //app js
                     //match start/end comment tags and get the contents. ie. <!--build-js(app)-start--> and <!--build-js(app)-end-->
                     match: /\<\!\-\-build\:js\(app\)\-start[\s\S]*build\:js\(app\)\-end\-\-\>/,
                     replacement: function ( matchedString ) {
                        //Grab all of the src attributes from the <script> tags
                        var jsArray = matchedString.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        jsArray.forEach( function( element ) {
                           //Get just the value of the src attribute (the file path to the JS file)
                           var resourceTarget = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                           var targetConfig = grunt.config( 'jsAppResources' );

                           //Alter the path for use with the concat task
                           targetConfig.push( '<%=baseDir%>/PackageTmp/' + resourceTarget );

                           //Add the path to the JS file to the jsAppResources configuration property
                           grunt.config( 'jsAppResources', targetConfig );
                        });

                        //Replace the entire build-js-start to build-js-end block with this <script> tag
                        return '<script type="text/javascript" src="ui/app/app.min.js?_=' + timestamp + '"></script>';
                     }
                  },
                  {
                     //vendor js
                     match: /\<\!\-\-build\:js\(vendor\)\-start[\s\S]*build\:js\(vendor\)\-end\-\-\>/,
                     replacement: function ( matchedString ) {
                        var jsArray = matchedString.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        jsArray.forEach( function( element ) {
                           var resourceTarget = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                           var targetConfig = grunt.config( 'jsVendResources' );
                           targetConfig.push( '<%=baseDir%>/PackageTmp/' + resourceTarget );
                           grunt.config( 'jsVendResources', targetConfig );
                        });
                        return '<script type="text/javascript" src="ui/lib/vendor.js?_=' + timestamp + '"></script>';
                     }
                  },
                  {
                     //vendor js - no concatination
                     match: /\<\!\-\-build\:js\(vendor\-noconcat\)\-start[\s\S]*build\:js\(vendor\-noconcat\)\-end\-\-\>/,
                     replacement: function ( matchedString ) {
                        var tags = '';
                        var jsArray = matchedString.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        jsArray.forEach( function( element ) {
                           var resourceTarget = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                           var targetConfig = grunt.config( 'jsVendNCResources' );
                           targetConfig.push( '<%=baseDir%>/PackageTmp/' + resourceTarget );
                           grunt.config( 'jsVendNCResources', targetConfig );

                           resourceTarget = resourceTarget.substring(resourceTarget.lastIndexOf('/') + 1);
                           tags += '<script type="text/javascript" src="ui/lib/'+resourceTarget+'?_=' + timestamp + '"></script>\n';
                        });
                        return tags;
                     }
                  },
                  {
                     //vendor css
                     match: /\<\!\-\-build\:css\(vendor\)\-start[\s\S]*build\:css\(vendor\)\-end\-\-\>/,
                     replacement: function ( matchedString ) {
                        //Grab all of the href attributes from the <href> tags
                        var cssArray = matchedString.match( /(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        cssArray.forEach( function( element ) {
                           var resourceTarget = element.match( /(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                           var targetConfig = grunt.config( 'cssVendResources' );
                           targetConfig.push( '<%=baseDir%>/PackageTmp/' + resourceTarget );
                           grunt.config( 'cssVendResources', targetConfig );
                        });
                        return '<link rel="stylesheet" media="screen" href="ui/lib/vendor.css?_=' + timestamp + '"/>';
                     }
                  }
               ]
            }
         }
      },
      concat: {
         jsApp: {
            src: [ '<%= jsAppResources %>' ],
            dest: '<%=baseDir%>/build/ui/app/app.min.js',
            options: {
               separator: ';\n',
               banner: "'use strict';\n",
               process: function (src) {
                  return '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
               }
            }
         },
         jsVendor: {
            src: [ '<%= jsVendResources %>' ],
            dest: '<%=baseDir%>/build/ui/lib/vendor.js',
            options: {
               separator: ';\n'
            }
         },
         cssVendor: {
            src: [ '<%= cssVendResources %>' ],
            dest: '<%=baseDir%>/build/ui/lib/vendor.css'
         }
      },
      ngAnnotate: {
         options: {
            add: true,
            singleQuotes: true
         },
         dist: {
            files: {
               '<%=baseDir%>/build/ui/app/app.min.js': ['<%=baseDir%>/build/ui/app/app.min.js']
            }
         }
      },
      uglify: {
         app: {
            options: {
               // the banner is inserted at the top of the output
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
               mangle: false,
               quoteStyle: 3,
               preserveComments: false
            },
            files: {
               '<%=baseDir%>/build/ui/app/app.min.js': ['<%=baseDir%>/build/ui/app/app.min.js']
            }
         },
         vendor: {
            options: {
               mangle: false,
               quoteStyle: 3,
               preserveComments: false
            },
            files: {
               '<%=baseDir%>/build/ui/lib/vendor.js': ['<%=baseDir%>/build/ui/lib/vendor.js']
            }
         },
         hl: {
            options: {
               mangle: false,
               quoteStyle: 3,
               preserveComments: false
            },
            files: {
               '<%=baseDir%>/build/ui/lib/sohoxi.js': '<%=baseDir%>/build/ui/lib/sohoxi.js',
               '<%=baseDir%>/build/ui/lib/infor-companyon-client.js': '<%=baseDir%>/build/ui/lib/infor-companyon-client.js'
            }
         }
      },
      cssmin: {
         target: {
            files: {
               '<%=baseDir%>/build/ui/lib/vendor.css': ['<%=baseDir%>/build/ui/lib/vendor.css']
            }
         }
      },
      compress: {
         full: {
            options: {
               archive: '<%=baseDir%>/SXWebH5_<%=pkg.version%>.<%=pkg.patch%>_uncompressed.zip'
            },
            files: [{
               expand: true,
               dot: true,
               cwd: '<%=baseDir%>/build',
               src: '**/*'
            }]
         },
         dist: {
            options: {
               archive: '<%=baseDir%>/SXWebH5_<%=pkg.version%>.<%=pkg.patch%>.zip'
            },
            files: [{
               expand: true,
               dot: true,
               cwd: '<%=baseDir%>/build',
               src: '**/*'
            }]
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-replace');

   grunt.registerTask('build', [
      'clean:build',
      'copy:build',
      'replace:gather',
      'concat:jsApp',
      'concat:jsVendor',
      'concat:cssVendor',
      'copy:hl',
      'ngAnnotate:dist',
      'compress:full',
      'uglify:app',
      'uglify:vendor',
      'uglify:hl',
      'cssmin',
      'compress:dist',
      'copy:deploy'
   ]);
};