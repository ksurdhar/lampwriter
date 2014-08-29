Lampwriter.Collections.Notes = Backbone.PageableCollection.extend({
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

window.Lampwriter.notes = new Lampwriter.Collections.Notes([],{
  state: {
    firstPage: 0,
    currentPage: 0,
    pageSize: 1
  },

  queryParams: {
    currentPage: "current_page",
    pageSize: "page_size"
  }
});
