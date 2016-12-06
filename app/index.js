'use strict';

var generators = require('yeoman-generator');
var project = require('../package.json');

module.exports = generators.Base.extend({
  prompting: function () {
    console.log("Running " + project.name + " v" + project.version + "...")

    function sanitiseSiteTitle(site) {
      return site.title.replace(/\s+/g, '-').toLowerCase();
    };

    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'title',
      message: 'Site title:'
    },{
      type: 'input',
      name: 'project',
      message: 'Project name:',
      default: sanitiseSiteTitle
    }];

    this.prompt(prompts, function (answers) {
      this.title = answers.title;
      this.project = answers.project;

      done();
    }.bind(this));

  },

  writing: {
    app: function () {
      console.log("Creating static HTML site '" + this.title + "'...")

      this.destinationRoot(this.project);

      this.copy('index.html', 'index.html');
      this.copy('package.json', 'package.json');
      this.copy('main.scss', 'main.scss');
      this.copy('Gruntfile.js', 'Gruntfile.js');
      this.copy('README.md', 'README.md');
      this.copy('gitignore', '.gitignore');

      this.directory("assets", this.destinationPath("assets"));
    }
  },

  end: function () {
    this.npmInstall();
  }
});
