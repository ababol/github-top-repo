describe("AppRoutes", function() {
  var AppRouter;

  it("Init Require", function(done) {
    require(['js/routers/App.Router'], function(Router) {
      AppRouter = Router;
      done();
    });
  });
  describe("AppRoute routes being fired", function() {
    beforeEach(function() {
      this.router = new AppRouter();
      this.routeSpy = jasmine.createSpy('routeSpy');
      try {
        Backbone.history.start({silent:true});
      } catch(e) {}
      this.router.navigate("elsewhere");
    });
    
    it("fires the repo route with #", function() {
      this.router.bind("route:repo", this.routeSpy);
      this.router.navigate("", true);
      expect(this.routeSpy).toHaveBeenCalled();
      expect(this.routeSpy.calls.count()).toBe(1);
      expect(this.routeSpy).toHaveBeenCalledWith();
    });

    it("fires the repo route with #Fedonono", function() {
      this.router.bind("route:repo", this.routeSpy);
      this.router.navigate("Fedonono", true);
      expect(this.routeSpy).toHaveBeenCalled();
      expect(this.routeSpy.calls.count()).toBe(1);
      expect(this.routeSpy).toHaveBeenCalledWith("Fedonono");
    });

    it("fires the repo route with #Fedonono/", function() {
      this.router.bind("route:repo", this.routeSpy);
      this.router.navigate("Fedonono/", true);
      expect(this.routeSpy).toHaveBeenCalled();
      expect(this.routeSpy.calls.count()).toBe(1);
      expect(this.routeSpy).toHaveBeenCalledWith("Fedonono");
    });

    it("fires the repoDetails route with #Fedonono/github-top-repo", function() {
      this.router.bind("route:repoDetails", this.routeSpy);
      this.router.navigate("Fedonono/github-top-repo", true);
      expect(this.routeSpy).toHaveBeenCalled();
      expect(this.routeSpy.calls.count()).toBe(1);
      expect(this.routeSpy).toHaveBeenCalledWith("Fedonono", "github-top-repo");
    });

    it("fires the repoDetails route with #Fedonono/github-top-repo/", function() {
      this.router.bind("route:repoDetails", this.routeSpy);
      this.router.navigate("Fedonono/github-top-repo", true);
      expect(this.routeSpy).toHaveBeenCalled();
      expect(this.routeSpy.calls.count()).toBe(1);
      expect(this.routeSpy).toHaveBeenCalledWith("Fedonono", "github-top-repo");
    });
  });
});