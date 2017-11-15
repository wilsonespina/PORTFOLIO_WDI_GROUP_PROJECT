const express           = require('express');
const router            = express.Router();
const authentications   = require('../controllers/authentications');
const secureRoute       = require('../lib/secureRoute');
const members           = require('../controllers/members');
const events            = require('../controllers/events');
const proxies           = require('../controllers/proxies');
const groups            = require('../controllers/groups');
const oauth             = require('../controllers/oauth');

router.route('/register')
  .post(authentications.register);

router.route('/login')
  .post(authentications.login);

router.route('/members/:id')
  .all(secureRoute)
  .get(members.show);

router.route('/events')
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .patch(events.update)
  .delete(events.delete);

router.route('/groups')
  .get(groups.index)
  .post(groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .patch(groups.update)
  .delete(groups.delete);

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment);

router.route('/events/:id/comments/:commentId')
  .delete(events.deleteComment);

router.route('/getEventData')
  .get(proxies.event);

router.route('/showEventData/:id')
  .get(proxies.show);

router.route('/oauth/spotify')
  .post(oauth.spotify);


router.all('/*', (req, res) => res.notFound());

module.exports = router;
