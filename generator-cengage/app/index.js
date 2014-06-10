'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CengageGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },


  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Cengage generator!'));

    var obj = this;

    var strings_package_json = ["jsonCreate","projectName","version_","description_","entryPoint","testCommand","gitRepository","keywords","author","licensce"];
    var flag = 0;

    var prompts = [{
      type: 'confirm',
      name: 'jsonCreate',
      message: 'Would you like to start creating the package.json file?',
      default: true
    },
    {
      type: 'input',
      name: 'projectName',
      value:"projectName",
      message: 'Name: ',
      default: 'Cengage'
    },
    {
      type: 'input',
      name: 'version_',
      message: 'Version: ',
      default: '0.0.0'
    },
    {
      type: 'input',
      name: 'description_',
      message: 'Description: ',
      default: 'This is a generic project'
    },
    {
      type: 'input',
      name: 'entryPoint',
      message: 'Entry Point: ',
      default: 'index.js'
    },
    {
      type: 'input',
      name: 'testCommand',
      message: 'Test Command: '
    },
    {
      type: 'input',
      name: 'gitRepository',
      message: 'Git Repository: '
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords: '
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author: ',
      default: 'Cengage'
    },
    {
      type: 'input',
      name: 'licensce',
      message: 'Licensce: ',
      default: 'BSD-2-Clause'
    }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.version_ = props.version_;
      this.description_ = props.description_;
      this.entryPoint = props.entryPoint;
      this.testCommand = props.testCommand;
      this.gitRepository = props.gitRepository;
      this.keywords = props.keywords;
      this.author = props.author;
      this.licensce = props.licensce;

      console.log("\n\nPackage.json file, please check the contents to make sure:\n{");
      for(var i=1;i<prompts.length;i++)
      {
        console.log(prompts[i].message+"'"+this[strings_package_json[i]]+"'");
      }
      console.log("};");

      var prompts1 = [{
        type: 'confirm',
        name: 'sure',
        message: 'Are you sure you want to proceed: ',
        default: true
      }];

      

      this.prompt(prompts1, function(props1){
        this.sure = props1.sure;
        if(this.sure==true)
        {
          
          var context = { 
            projectName : this.appName,//this.projectName,
            version_ : this.version_,
            description_:this.description_,
            entryPoint:this.entryPoint,
            testCommand:this.testCommand,
            gitRepository:this.gitRepository,
            keywords:this.keywords,
            author:this.author,
            licensce:this.licensce
          };
          obj.template('_package.json', 'package.json');//, context);
        }
      done();
      });
    }.bind(this));
  },

  /*createPackage: function(props)
  {
    

  },*/

  app: function () {
    this.mkdir('app');
    this.mkdir('test');
    this.mkdir('app/static');
    this.mkdir('app/routes');
    this.mkdir('app/views');
    this.mkdir('app/static/css');
    this.mkdir('app/static/js');
    this.mkdir('app/static/img');
    this.mkdir('node_modules');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = CengageGenerator;
