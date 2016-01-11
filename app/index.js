'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {

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

      this.install = function install(source) {
        this.fs.copyTpl(
          this.templatePath(source),
          this.destinationPath(source),
          {
            title   : this.title,
            project : this.project
          }
        );
      };

      console.log("Creating static HTML site '" + this.title + "'...")

      this.destinationRoot(this.project)

      this.install("index.html");
      this.install("package.json");
      this.install("main.scss");
      this.install("Gruntfile.js");
      this.install("README.md");

      this.directory("assets", this.destinationPath("assets"));
    }
  },

  end: function () {
    this.npmInstall();
  }
});
