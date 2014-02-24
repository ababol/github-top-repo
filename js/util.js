'use strict';

define([], function () {
  return ({
    convertDate: function(time) {
      var dateU = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        dateN = new Date(),
        lastU = (dateN-dateU)/(1000),
        string = "less than 1 minute";

      if (lastU > 86400) {
        string = Math.floor(lastU/86400)+" days ago";
      }
      if (lastU < 86400 && lastU >= 3600) {
        string = Math.floor(lastU/3600)+" hours ago";
      }
      if (lastU < 3600 && lastU >= 60) {
        string = Math.floor(lastU/60)+" minute(s) ago";
      }
      return string;
    }
  });
});