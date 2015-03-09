'use strict';
var MF = MeetupFriends;
var elementTestId = '#rsvp_46827552';
var $j = jQuery;
var $z = Zepto;

describe('MeetupFriends', function() {
  beforeEach(function() {
    fixture.load('index.html');
  });

  describe('.getMemberNameFromElement()', function() {
    it('should return a trimmed memberName', function() {
      // Given
      var element = $z(elementTestId);

      // When
      var actual = MF.getMemberNameFromElement(element);

      // Then
      expect(actual).to.equal('Sylvain UTARD');
    });
  });

  describe('.getMemberIdFromElement()', function() {
    it('should return a memberId', function() {
      // Given
      var element = $z(elementTestId);

      // When
      var actual = MF.getMemberIdFromElement(element);

      // Then
      expect(actual).to.equal(46827552);
    });
  });

  describe('.getMemberFromElement', function() {
    it('should return an object with a memberId and a memberName', function() {
      // Given
      var element = $(elementTestId);

      // When
      var actual = MF.getMemberFromElement(element);

      // Then
      expect(actual).to.contain.keys('memberId');
      expect(actual).to.contain.keys('memberName');
    });
  });

  describe('.getAllMembersGoing()', function() {
    it('should get all the elements', function() {
      // Given;

      // When;
      var actual = MF.getAllMembersGoing();

      // Then
      expect(actual.length).to.equal(2);

    });
  });
});
