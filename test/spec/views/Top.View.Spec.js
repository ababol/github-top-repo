describe("TopView", function() {

  var TopView, RepoModel;
  var self = this;

  it("Init Require", function(done) {
    require(['js/views/Top.View', 'js/models/Repo.Model'], function(TopV, RepoM) {
      RepoModel = RepoM;
      TopView = TopV;
      done();
    });
  });

  describe("Views Added", function() {
    beforeEach(function() {
      self.repoEl = $("#repo-list");
      self.repo = new RepoModel({
        owner: {
          login: "login",
          avatar_url: "https://avatars.githubusercontent.com/u/1850538"
        }
      });
      self.RepoView = new TopView({model: self.repo});
      self.RepoView.render();
    });

    it("View Created", function() {
      expect(self.RepoView.$el).toBeDefined();
    });

    it("Information Correctly Added", function() {
      var el = self.RepoView.$el,
        loginM = self.repo.get('owner').login,
        avatar_urlM = self.repo.get('owner').avatar_url;
      var elOwner = el.find('.owner');
      var elOwnerImg = elOwner.find('img');

      expect(loginM).toBeDefined();
      expect(loginM).toEqual("login");
      expect(avatar_urlM).toBeDefined();
      expect(avatar_urlM).toEqual("https://avatars.githubusercontent.com/u/1850538");

      expect(elOwner.html().replace(/<img[^>]*>/g,"")).toEqual(loginM);
      expect(elOwnerImg.attr('src')).toEqual(avatar_urlM);
    });
  });
});