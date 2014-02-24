describe('Collection :: Repo', function() {
  var collection,
    RepoCollection,
    // The API CALL are limited to 60/hour, so we fetch the data on only 1collection
    collectionF,
    config;

  it("Init Require", function(done) {
    require(['js/collections/Repo.Collection', 'js/config'], function(RepoC, Config) {
      RepoCollection = RepoC;
      collectionF = new RepoC();
      config = Config;
      done();
    });
  });

  describe('Collection Empty test', function() {
    beforeEach(function() {
      collection = new RepoCollection();
    });

    it('collections correctly initialize', function() {
      expect(collection).not.toBe(null);
    });

    it('collections url', function() {
      expect(collection.url()).toEqual("https://api.github.com/users/"+config.User+"/repos");
    });
  });


  describe('Collection Fetch test', function() {
    it("collectionF fetch", function(done) {
      collectionF.fetch({
        success: function(){
          done();
        }
      });
    });

    it('collectionsF.length =< Config.Top (20 by default)', function() {
      expect(collectionF.length).toBeLessThan(config.Top+1);
    });

    it('collectionsF correctly sort', function() {
      var boolSort = true,
        newScore,
        oldScore = null;
      collectionF.each(function(repo) {
        newScore = repo.get('watchers_count')+repo.get('stargazers_count');
        if (oldScore) {
          if (oldScore < newScore) {
            boolSort = false;
          }
        }
        oldScore = newScore;
      });
      expect(boolSort).toBeTruthy();
    });

  });
});