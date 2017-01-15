const Post  = require('../server/database/schema').Post;
const fs    = require('fs');
const mmm   = require('mmmagic');

const Magic = mmm.Magic;
const ROOT_PATH = `${__dirname}/../dist`;

Post
  .run()
  .then(posts => {
    posts.forEach(post => {
      const imageName = post.image;
      // If does not have an extension
      if (imageName.indexOf('.') === -1) {
        const magic = new Magic(mmm.MAGIC_MIME_TYPE);
        const filePath = `${ROOT_PATH}${imageName}`;
        magic.detectFile(filePath, (err, result) => {
          if (err) throw err;
          if (result.split('/').length > 1) {
            const type = result.split('/')[1];
            const newFilePath = `${ROOT_PATH}${imageName}.${type}`;
            post.image = `${imageName}.${type}`;
            process.stdout.write(`${post.image}\n`);
            fs.rename(filePath, newFilePath, (error) => {
              if (error) throw error;
              post
                .save()
                .then(doc => {
                  process.stdout.write(`${doc.title} updated\n`);
                });
            });
          }
        });
      }
    });
  });
