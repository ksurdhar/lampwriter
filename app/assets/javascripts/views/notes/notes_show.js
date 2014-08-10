Lampwriter.Views.notesShow = Backbone.View.extend({

  template: JST['notes/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync remove change", this.render);
  },

  render: function () {
    var renderedContent = this.template({ note: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});
