Lampwriter.Views.notesNew = Backbone.View.extend({

  template: JST["notes/new"],

  events: {
    "submit form": "submit"
  },

  initialize: function(options) {
    options.id ? this.id = options.id : this.id = null;
  },

  render: function () {
    var that = this;
    if(this.id){
      var note = Lampwriter.notes.getOrFetch(this.id);

      var renderedContent = this.template({
        note: note
      });
      this.$el.html(renderedContent);
      return this;
    } 
    else{
      var renderedContent = this.template({
        note: null
      });
      this.$el.html(renderedContent);
      return this;
    }
  },

  submit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    if(this.id){
      var note = Lampwriter.notes.getOrFetch(this.id);
      note.save(params, {
        patch: true,
        success: function(params) {
          // that._events.trigger("editNote", that.model);
          Backbone.history.navigate("/notes", { trigger: true });
        }
      });
    } 
    else{
      var newNote = new Lampwriter.Models.Note(params["note"]);
      newNote.save({}, {
        success: function () {
          Lampwriter.notes.add(newNote);
          Backbone.history.navigate("/notes", { trigger: true });
        }
      });
    }
  }
});
