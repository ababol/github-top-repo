describe("AppView", function() {

  var AppView, RepoCollection, RepoModel;
  var self = this;

  it("Init Require", function(done) {
    require(['js/views/App.View', 'js/collections/Repo.Collection', 'js/models/Repo.Model'], function(AppV, RepoC, RepoM) {
      RepoCollection = RepoC;
      RepoModel = RepoM;
      AppView = AppV;
      done();
    });
  });

  describe("Instantiation", function() {
    it("Can't Create an Empty AppView", function() {
      var thrown = undefined;
      try {
        new AppView();
      } catch(e) {
        thrown = e;
      }
      expect(thrown).toBeDefined();
    });

    it("Can Create a AppView with a Collection", function() {
      var thrown = undefined,
        AppV = undefined;
      try {
        AppV = new AppView({collection: new RepoCollection()});
      } catch(e) {
        thrown = e;
      }
      expect(thrown).toBeUndefined();
      expect(AppV).toBeDefined();
    });

  });


  describe("Views Added", function() {
    beforeEach(function() {
      self.repoEl = $("#repo-list");
      self.repo1 = new RepoModel({});
      self.repo2 = new RepoModel({});
      self.repo3 = new RepoModel({});
      self.RepoCollection = new Backbone.Collection([
        self.repo1,
        self.repo2,
        self.repo3
      ]);
      self.AppView = new AppView({collection: self.RepoCollection});
      self.AppView.addAll();
    });

    it("Collection Size 3", function() {
      expect(self.AppView.collection.length).toEqual(3);
    });


    it("UL->LI Size 3", function() {
      expect(self.repoEl.find('li').length).toEqual(3);
    });

  });
});