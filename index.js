angular
  .module('libraryHUD', [])
  .component('libraryHud', {
    template: `
    <md-card ng-repeat="library in libraries" class="default-card" flex>
        <img ng-src="{{ library.img }}" class="md-card-image" alt="image caption">
        <md-card-title>
            <md-card-title-text>
                <span class="md-headline">{{ library.name }}</span>
                <span ng-if="library.hours" class="md-title">{{ library.hours }}</span>
                <span ng-if="!library.hours" class="md-title"><a href="{{ library.hours_link.url }}">Click here for hours</a></span>
            </md-card-title-text>
        </md-card-title>
        <md-card-content>
            <p ng-if="library.email">Contact email: <a ng-href="mailto:{{library.email }}">{{ library.email }}</a></p>
            <p ng-if="library.phone">Contact phone: <a ng-href="tel:{{library.phone }}">{{ library.phone }}</a></p>
        </md-card-content>
        <md-card-actions ng-if="library.links" layout="row">
            <div ng-repeat="link in library.links">
                <a ng-href="{{ link.url }}">
                    <md-button>{{ link.name }}</md-button>
                </a>
            </div>
        </md-card-actions>
    </md-card>
    `,
    controller: ['$scope', 'HUDService', 'libraries', function ($scope, HUDService, libraries) {
      $scope.libraries = libraries
      $scope.libraries.map(
        library => HUDService.getHours(library).then(
          hours => library.hours = hours
        )
      )
    }],
  })
  .factory('HUDService', ['$http', function ($http) {
    return {
      /**
       * Fetches the current operating hours for a library.
       * @param  {object} library  library object from config
       * @return {promise}         description of hours, or false if not fetched
       */
      getHours(library) {
        if (library.hours_link && library.hours_link.type === 'gcal') {
          return $http.get(library.hours_link.url).then(
            response => "Today's Hours: " + response.data.items[0].summary
          )
        }
        else return new Promise(() => false)
      }
    }
  }])
  .run(
    ($http) => {
      // Necessary for requests to succeed...not sure why
      $http.defaults.headers.common = { 'X-From-ExL-API-Gateway': undefined }
    },
  );
