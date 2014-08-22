Lampwriter.Views.notesShow = Backbone.View.extend({

  template: JST['notes/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync remove change", this.render);
  },

  events: {
    'click #delete': 'deleteNote'
  },

  render: function () {
    var renderedContent = this.template({ note: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  deleteNote: function(){
    var note = Lampwriter.notes.get(this.model.id);
    note.destroy({
      success: function(params) {
        Backbone.history.navigate("/notes", { trigger: true });
      }
    });
  }
});
