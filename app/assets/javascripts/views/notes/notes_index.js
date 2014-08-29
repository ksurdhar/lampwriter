Lampwriter.Views.notesIndex = Backbone.View.extend({

  template: JST['notes/index'],

  initialize: function(options) {
    this.listenTo(this.collection, "sync remove change add", this.render);
  },

  events: {
    "click .next": "nextPage"
  },

  render: function () {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  nextPage:function(){
    // debugger
    this.collection.getNextPage();
    this.render();
  }

});
