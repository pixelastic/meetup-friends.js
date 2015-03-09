'use strict';

(function($) {
  var buttonTemplate = '<button class="button meetup-friend-button <%= className %>"><%= text %></button>';
  Parse.initialize('0D5RsiFXNlcC7JAJ3m7o1O9BgPuf4SJIFJ1lrhEx', 'KgEq6AIufQrBAYAgUI19t6rCVtRYjaQA1jskD2qS');
  var Friend = Parse.Object.extend('Friend');
  var friendList = {};

  function getAllMembersGoing() {
    return _.map($('#rsvp-list li'), getMemberFromElement);
  }

  function getMemberNameFromElement(element) {
    return _.trim($(element).find('h5.member-name').text());
  }

  function getMemberIdFromElement(element) {
    return $(element).data('memberid');
  }

  function getMemberFromElement(element) {
    return {
      id: getMemberIdFromElement(element),
      name: getMemberNameFromElement(element)
    };
  }

  function getElementFromMember(member) {
    return $('#rsvp_' + member.id);
  }

  function addButtonToElement(element) {
    var member = getMemberFromElement(element);
    var isFriend = isFriendWithMe(member);
    var props = {
      text: isFriend ? 'Remove' : 'Add',
      className: isFriend ? 'secondary' : 'primary'
    };
    var button = $(_.template(buttonTemplate)(props));

    button.on('click', function() {
      (isFriend ? removeFromFriends : addAsFriend)(member);
    });

    element.prepend(button);
  }

  function removeButtonFromElement(element) {
    element.find('button.meetup-friend-button').remove();
  }

  function updateMemberButton(member) {
    var element = getElementFromMember(member);
    removeButtonFromElement(element);
    addButtonToElement(element);
  }

  function addButtonsToAllMembers() {
    var allMembers = getAllMembersGoing();
    _.each(allMembers, function(member) {
      addButtonToElement(getElementFromMember(member));
    });
  }

  function isFriendWithMe(member) {
    return !!friendList[member.id];
  }

  function removeFromFriends(member) {
    var friend = friendList[member.id];
    new Friend().set('objectId', friend.objectId).destroy().then(function() {
      delete friendList[member.id];
      updateMemberButton(member);
    });
  }

  function addAsFriend(member) {
    new Friend().save({
      memberId: member.id,
      name: member.name
    }).then(function(data) {
      var friend = member;
      friend.objectId = data.id;
      console.log(data);
      friendList[member.id] = friend;
      updateMemberButton(member);
    });
  }

  $(function() {
    new Parse.Query(Friend).find().then(function(data) {
      // Copy all Parse objects into friendList
      _.each(data, function(friend) {
        var id = friend.attributes.memberId;
        friendList[id] = {
          id: id,
          name: friend.attributes.name,
          objectId: friend.id
        };
      });

      addButtonsToAllMembers();
    });
  });

  window.MeetupFriends = {
    getAllMembersGoing: getAllMembersGoing,
    getMemberNameFromElement: getMemberNameFromElement,
    getMemberIdFromElement: getMemberIdFromElement,
    getMemberFromElement: getMemberFromElement,
    addButtonToElement: addButtonToElement,
    removeButtonFromElement: removeButtonFromElement,
    getElementFromMember: getElementFromMember,
    addButtonsToAllMembers: addButtonsToAllMembers,
    isFriendWithMe: isFriendWithMe,
    removeFromFriends: removeFromFriends,
    addAsFriend: addAsFriend
  };

})(Zepto);
