
````     _                    _              _                                         _           _       _             
    / \     _ __    ___  | |__     ___  | |_   _   _   _ __     ___   _ __        | |   __ _  | |__   | |__     __ _ 
   / _ \   | '__|  / __| | '_ \   / _ \ | __| | | | | | '_ \   / _ \ | '__|    _  | |  / _` | | '_ \  | '_ \   / _` |
  / ___ \  | |    | (__  | | | | |  __/ | |_  | |_| | | |_) | |  __/ | |      | |_| | | (_| | | |_) | | |_) | | (_| |
 /_/   \_\ |_|     \___| |_| |_|  \___|  \__|  \__, | | .__/   \___| |_|       \___/   \__,_| |_.__/  |_.__/   \__,_|
                                               |___/  |_|                                                            
````

This project aims to build apps easy and fast

### Files

1. index.ts is the entry point of application
2. Metadata.tx retrieves the model
3. Archetyper is the main facade routine
4. Parser.ts makes transformations on files
5. repository.ts handles the conection with git and get the repo

#### Check the unit tests to understand the application


### uses:

[replace-in-file node tool](https://www.npmjs.com/package/replace-in-file)

basically, we take the replacing features from replace-in-file package with some improvements
in that way;

use of regular expressions, replace by fixed test
````
{
      "files": "package.json",
      "from": "\"name\": \".*\"",
      "to": "\"name\": \"new-project\""
    }
````

use of regular expressions, another sample replace by fixed test
````
    {
      "files": "README.md",
      "from": "[A-Za-z-]+",
      "to": "patata"
    }

````

replace fixed text by var in model **note that var in model, should be between 3 brackets**
````
    {
          "files": "src/index.html",
          "from": ["Hello World","Hello world"],
          "to": "[[[name]]]"
    }
````
   
replace fixed text between HTML tags by var in model 
````
    {
          "files": "src/index.html",
          "from": "<title>(.*?)<\/title>",
          "to": "[[[name]]]"
    }
````
    
### Model


Model is a merge between data already set in the rules files and the data collected on console:
````
{
  "title":"webapp-seed",
  "description":"some description here",
  "name":"test-project",
  "destination":"./tmp",
  "repository": {
    "url": "https:\/\/github.com\/medeasolution\/webapp-seed.git",
    "branch": "master",
    "tag": "init"
  },
  "tags":["angularjs"],
  "transformations": [
    {
      "files": "package.json",
      "from": "\"name\": \".*\"",
      "to": "\"name\": \"new-project\""
    },
    {
      "files": "README.md",
      "from": "[A-Za-z-]+",
      "to": "patata"
    },
    {
      "files": "src/index.html",
      "from": ["Hello World","Hello world"],
      "to": "[[[name]]]"
    }

  ]

}
````
    
### Generated new project should

1. create github repository
2. create project with parameterized data from seed repo
3. add project to jenkins [[TODO]]

npm run compile && npm run start  (copy rules folder to dist)

##TODO's

1. add more repositories
2. add more transformation cases
3. create new repo's in git
4. compile and execute the apps
5. add logic to play with styles in the apps
6. add tags to seed repo, so we can choose different flavours of the apps
7. deploy modules programatically to seed apps
8. handle git permissions
9. Rather than only **transformations** add other types of interaction, for instance (generations, logic flow, icons, etc...)
10. reporting tool to inform about the process

The main goal is create an application mobile-frontend-backoffice-api like we would do by coding.

