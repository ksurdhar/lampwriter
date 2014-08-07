Lampwriter.Collections.Users = Backbone.Collection.extend({
  url: "users",
  model: Lampwriter.Models.User

});

window.Lampwriter.users = new Lampwriter.Collections.Users();
