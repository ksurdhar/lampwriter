Lampwriter.Collections.Notes = Backbone.Collection.extend({
  url: "notes",
  model: Lampwriter.Models.Note

});

window.Lampwriter.notes = new Lampwriter.Collections.Notes();
