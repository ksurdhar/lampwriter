Lampwriter.Views.notesIndex = Backbone.View.extend({

  template: JST['notes/index'],

  initialize: function(options) {
    this.listenTo(this.collection, "sync remove change reset", this.render);
  },

  events: {
    "click .next": "nextPage",
    "click .back": "previousPage",
    "click .index-filter-recent": "filterRecent",
    "click .index-filter-title": "filterTitle"
  },

  render: function () {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    $('.age').age();
    return this;
  },

  filterRecent: function(){
    this.collection.state.sortKey = "created_at";
    this.collection.getFirstPage();
  },

  filterTitle: function(){
    this.collection.state.sortKey = "title";
    this.collection.getFirstPage();
  },

  nextPage:function(){
    this.collection.getNextPage();
  },

  previousPage:function(){
    this.collection.getPreviousPage();
  }
});
