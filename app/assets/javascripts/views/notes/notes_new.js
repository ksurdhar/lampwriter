Lampwriter.Views.notesNew = Backbone.View.extend({

  template: JST["notes/new"],

  events: {
    "submit form": "submit"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newNote = new Lampwriter.Models.Note(params["note"]);

    newNote.save({}, {
      success: function () {
        Lampwriter.notes.add(newNote);
        Backbone.history.navigate("/notes", { trigger: true });
      }
    });
  }
});
