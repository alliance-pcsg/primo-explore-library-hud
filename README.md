# primo-explore-library-hud
a simple HUD (heads up display) component for embedding in primo-explore.

## installation

```js
var app = angular.module('viewCustom', ['libraryHUD']);
```

## configuration

### example

```js
angular.module('libraryHUD').config(
  function($provide) {
    $provide.constant('libraries', [{
        name: "My Awesome Library",
        email: "librarian@awesome.edu",
        phone: "555-555-5555",
        img: "https://library.awesome.edu/picture_of_library.jpg",
        hours_link: {
          "type": "gcal",
          "url": "https://library.awesome.edu/getHours.php"
        },
        links: [{
            "name": "Homepage",
            "url": "http://library.awesome.edu"
          },
          {
            "name": "Get Help",
            "url": "http://awesome.library.edu/help"
          }
        ]
      },
      {
        name: "Awesome Law School Library",
        email: "lawlib@awesome.edu",
        phone: "666-666-6666",
        img: "https://library.awesome.edu/picture_of_law_library.jpg",
        hours_link: {
          "type": "page",
          "url": "https://law.awesome.library.edu/hours/"
        },
        links: [{
            "name": "Homepage",
            "url": "http://law.awesome.library.edu"
          }
        ]
      }
    ])
  }
)
```
