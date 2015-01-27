'use strict';

(function() {
  Parse.initialize('0D5RsiFXNlcC7JAJ3m7o1O9BgPuf4SJIFJ1lrhEx', 'KgEq6AIufQrBAYAgUI19t6rCVtRYjaQA1jskD2qS');
  var Friend = Parse.Object.extend('Friend');
  var FriendCollection = Parse.Collection.extend({
    model: Friend
  });

  // Get all friends
  function getAllFriends() {
    return new FriendCollection().fetch();
  }

  // Add a + button near each person in the list
  function addButtonsToEachPerson() {
    var lis = $('#rsvp-list li, #rsvp-list-waitlist li, #rsvp-list-no li');
    var template = $('#friend-action-template').html();

    // Adding buttons to all elements
    lis.each(function(index, li) {
      var $li = $(li);
      var memberId = $li.data('memberid');
      var memberName = $li.find('h5.member-name').text();
      // Add button
      $li.prepend(template);

      // Add click handler
      $li.find('button.friend-add').on('click', function() {
        var friend = new Friend();
        friend.save({
          memberId: memberId,
          memberName: memberName
        }).then(function(object) {
          console.log('yay! it worked', object);
        });
      });
    });
  }

  getAllFriends().then(function(data) {
    console.log(data);
  });

  // addButtonsToEachPerson();


})();
