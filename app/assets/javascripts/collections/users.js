Lampwriter.Collections.Users = Backbone.Collection.extend({
  url: "users",
  model: Lampwriter.Models.User,

  getOrFetch: function (id){
    var user;
    var users = this;

    if(user = this.get(id)){
      user.fetch();
      return user;
    } else {
      user = new Lampwriter.Models.User({ id: id });
      user.fetch({
        success: function(){ Lampwriter.users.add(user) }
      });
      return user
    }
  }

});

window.Lampwriter.users = new Lampwriter.Collections.Users();
