Lampwriter.Views.usersShow = Backbone.View.extend({

  template: JST['users/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync remove change", this.render);
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});
