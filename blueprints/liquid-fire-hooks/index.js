/*jshint node:true*/
module.exports = {
  description: 'Install Dependencies',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    this.addAddonToProject('liquid-fire');
  }
};
