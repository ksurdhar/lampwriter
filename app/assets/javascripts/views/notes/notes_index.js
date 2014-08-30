Lampwriter.Views.notesIndex = Backbone.View.extend({

  template: JST['notes/index'],

  initialize: function(options) {
    this.listenTo(this.collection, "sync remove change", this.render);
  },

  events: {
    "click .next": "nextPage",
    "click .back": "previousPage"
  },

  render: function () {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    $('.age').age();
    return this;
  },

  nextPage:function(){
    this.collection.getNextPage();
  },

  previousPage:function(){
    this.collection.getPreviousPage();
  }
});
