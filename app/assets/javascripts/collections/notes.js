Lampwriter.Collections.Notes = Backbone.Collection.extend({
  url: "notes",
  model: Lampwriter.Models.Note,

  getOrFetch: function (id){
    var note;
    var notes = this;

    if(note = this.get(id)){
      note.fetch();
      return note;
    } else {
      note = new Lampwriter.Models.Note({ id: id });
      note.fetch({
        success: function(){ Lampwriter.notes.add(note) }
      });
      return note
    }
  }

});

window.Lampwriter.notes = new Lampwriter.Collections.Notes();
