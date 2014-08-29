Lampwriter.Views.notesShow = Backbone.View.extend({

  template: JST['notes/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync remove change", this.render);
  },

  events:{
    "click #publish": "publishNote"
  },

  render: function () {
    var renderedContent = this.template({ note: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  publishNote: function (event) {
    event.preventDefault();
    var params = $("#note-form").serializeJSON();
    var note = Lampwriter.notes.getOrFetch(this.id);
    note.save(params, {
      patch: true,
      success: function(params) {
        Backbone.history.navigate("/notes/"+note.id, { trigger: true });
      }
    });
  }
});
