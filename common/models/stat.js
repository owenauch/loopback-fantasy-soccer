"use strict";

module.exports = function(Stat) {
  Stat.observe("before save", async function(ctx) {
    Stat.find(
      {
        fields: { id: true },
        where: {
          name: ctx.instance.name,
          week: ctx.instance.week
        }
      },
      (err, dups) => {
        if (err) {
          console.log(err);
        } else {
          dups.forEach(dup => {
            Stat.destroyById(dup.id, err => {
              if (err) {
                console.log(err);
              } else {
                console.log("Duplicate successfully purged: " + ctx.name);
              }
            });
          });
        }
      }
    );
  });
};
