describe('Model :: Repo', function() {
  var repo, RepoModel, RepoCollection;

  it("Init Require", function(done) {
    require(['js/collections/Repo.Collection', 'js/models/Repo.Model'], function(RepoC, RepoM) {
      RepoCollection = RepoC;
      RepoModel = RepoM;
      done();
    });
  });

  describe('when instantiated with default attributes', function() {   
    beforeEach(function() {
      repo = new RepoModel({});
    });

    it('Correct Attribute', function() {
      expect(repo.get('name')).toEqual('');
      expect(repo.get('full_name')).toEqual('');
      expect(repo.get('owner')['login']).toEqual('');
      expect(repo.get('stargazers_count')).toEqual(0);
      expect(repo.get('watchers_count')).toEqual(0);
      expect(repo.get('forks_count')).toEqual(0);
      expect(repo.get('description')).toEqual('');
    });
  });

  describe('when instantiated with custom attributes', function() {   
    beforeEach(function() {
      repo = new RepoModel({
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
    });

    it('Correct Attribute', function() {
      expect(repo.get('name')).toEqual('name');
      expect(repo.get('full_name')).toEqual('full_name');
      expect(repo.get('owner')['login']).toEqual('login');
      expect(repo.get('stargazers_count')).toEqual(10);
      expect(repo.get('watchers_count')).toEqual(20);
      expect(repo.get('forks_count')).toEqual(30);
      expect(repo.get('description')).toEqual('description');
    });
    
    it('Correct Id', function() {
      expect(repo.get('id')).toEqual(repo.get('full_name'));
    });
  });
});