// Proposals service used to communicate Proposals REST endpoints
(function () {
  'use strict';

  angular
    .module('proposals')
    .factory('ProposalsService', ProposalsService);

  ProposalsService.$inject = ['$resource', '$log'];

  function ProposalsService($resource, $log) {
    var Proposal = $resource('/api/proposals/:proposalId', {
      proposalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      submit: {
        method: 'PUT',
        url: '/api/submit/proposal/:proposalId'
      },
      forOpportunity: {
        method: 'GET',
        url: '/api/proposals/for/opportunity/:opportunityId',
        isArray: true
      },
      removeDoc: {
        method: 'GET',
        url: '/api/proposal/:proposalId/remove/doc/:documentId'
      },
      makeRequest: {
        method: 'GET',
        url :'/api/request/proposal/:proposalId'
      },
      my: {
        method: 'GET',
        url: '/api/my/proposals',
        isArray: true
      },
      myopp: {
        method: 'GET',
        url: '/api/myopp/proposal/:opportunityId'
      },
      getRequests: {
        method: 'GET',
        url :'/api/proposals/requests/:proposalId',
        isArray: true
      },
      getMembers: {
        method: 'GET',
        url :'/api/proposals/members/:proposalId',
        isArray: true
      },
      confirmMember: {
        method: 'GET',
        url : '/api/proposals/requests/confirm/:proposalId/:userId'
      },
      denyMember: {
        method: 'GET',
        url : '/api/proposals/requests/deny/:proposalId/:userId'
      }
    });

    angular.extend(Proposal.prototype, {
      createOrUpdate: function () {
        var proposal = this;
        return createOrUpdate(proposal);
      }
    });
    return Proposal;

    function createOrUpdate(proposal) {
      if (proposal._id) {
        return proposal.$update(onSuccess, onError);
      } else {
        return proposal.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(proposal) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }

      function handleError(error) {
        // Log error
        $log.error(error);
      }
    }
  }
}());
