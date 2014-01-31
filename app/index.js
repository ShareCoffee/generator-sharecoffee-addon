'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var SharecoffeeAddonGenerator = module.exports = function SharecoffeeAddonGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SharecoffeeAddonGenerator, yeoman.generators.Base);

SharecoffeeAddonGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
    type: 'input',
    name: 'addOnName',
    message: "What's the name of your ShareCoffee Addon?",
    default: (this.appname)? "ShareCoffee."+ _.capitalize(this.appname): 'ShareCoffee.MyAddOn'
  },
  {
    type: 'input',
    name: 'addOnDescription',
    message: "Give me a short description of your AddOn: ",
    default: "This is an awesome AddOn for ShareCoffee"
  },
  {
    type: 'input', 
    name: 'author',
    message: "What's your name?"
  }];

  this.prompt(prompts, function (props) {
    this.addOnName = props.addOnName;
    this.addOnDescription = props.addOnDescription
    this.authorName = props.author;

    cb();
  }.bind(this));
};

SharecoffeeAddonGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('dist');
  this.mkdir('docs');
  this.mkdir('docs/assets');
  this.mkdir('license');
  this.mkdir('nuget');
  this.mkdir('test');
  this.copy('_ShareCoffee.AddOn.nuspec', this.addOnName +'.nuspec');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_README.md', 'README.md');
  this.copy('_readme.txt', 'readme.txt');
  this.copy('_Gruntfile.coffee', 'Gruntfile.coffee');
  this.copy('_ShareCoffee.AddOn.tests.coffee', 'test/' + this.addOnName+ '.tests.coffee');
  this.copy('_ShareCoffee.AddOn.coffee', 'src/'+ this.addOnName+'.coffee');
  this.copy('_ShareCoffee.AddOn.license.coffee', 'license/'+this.addOnName + '.license.coffee');
  this.copy('_sharecoffee.css', 'docs/assets/sharecoffee.css');
};

SharecoffeeAddonGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore')
  this.copy('jshintrc', '.jshintrc');
};
