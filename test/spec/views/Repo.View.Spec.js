describe("RepoView", function() {

  var RepoView, RepoModel;
  var self = this;

  it("Init Require", function(done) {
    require(['js/views/Repo.View', 'js/models/Repo.Model'], function(RepoV, RepoM) {
      RepoModel = RepoM;
      RepoView = RepoV;
      done();
    });
  });

  describe("Views Added", function() {
    beforeEach(function() {
      self.repoEl = $("#repo-list");
      self.repo = new RepoModel({
        name: "name",
        full_name: "full_name",
        owner: {
          login: "login"
        },
        stargazers_count: 10,
        watchers_count: 20,
        forks_count: 30,
        description: "description",
        languagesUsed: null
      });
      self.RepoView = new RepoView({model: self.repo});
      self.RepoView.render();
    });

    it("View Created", function() {
      expect(self.RepoView.$el).toBeDefined();
    });

    it("Information Correctly Added", function() {
      var el = self.RepoView.$el;
      var elLoginName = el.find("#"+self.repo.get('owner').login+"_"+self.repo.get('name'));
      expect(elLoginName.length).toEqual(1);
    });

    it("Title correct", function() {
      var el = self.RepoView.$el,
        full_name = self.repo.get('full_name'),
        name = self.repo.get('name');

      expect(full_name).toBeDefined();
      expect(full_name.length).toBeGreaterThan(1);
      expect(full_name).toEqual("full_name");
      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(1);
      expect(name).toEqual("name");

      var elTitle = el.find('.title');
      expect(elTitle.length).toEqual(1);
      expect(elTitle.attr('href')).toEqual("#"+full_name);
      expect(elTitle.html()).toEqual(name);
    });

    it("Fork(s)/Star(s)/Watcher(s) Count Correct", function() {
      var el = self.RepoView.$el,
        stars_countM = self.repo.get('stargazers_count');
        watchers_countM = self.repo.get('watchers_count');
        forks_countM = self.repo.get('forks_count');

      expect(stars_countM).toBeDefined();
      expect(stars_countM).toEqual(10);
      expect(watchers_countM).toBeDefined();
      expect(watchers_countM).toEqual(20);
      expect(forks_countM).toBeDefined();
      expect(forks_countM).toEqual(30);

      var stars_count = parseInt(el.find('.stars_count').html().replace(/<img[^>]*>/g,""));
      expect(stars_count).toBeDefined();
      expect(stars_count).toEqual(stars_countM);

      var watchers_count = parseInt(el.find('.watchers_count').html().replace(/<img[^>]*>/g,""));
      expect(watchers_count).toBeDefined();
      expect(watchers_count).toEqual(watchers_countM);

      var forks_count = parseInt(el.find('.forks_count').html().replace(/<img[^>]*>/g,""));
      expect(forks_count).toBeDefined();
      expect(forks_count).toEqual(forks_countM);
    });
  });
});