home-agency-style-reen
======================

## If you haven't node.js, gulp and bower

Install NVM
    
    ```bash
    sudo apt-get update
    sudo apt-get install build-essential libssl-dev
    curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
    ```
    
Reopen terminal, and install node.js

    nvm install stable
    nvm alias default stable

Install bower & gulp

    npm install -g bower
    npm install -g gulp

Then go to the next step.

## If you have installed node.js, gulp and bower
Go to the project directory

    cd project-directory

Run the following commands

    npm install
    bower install
    gulp

And open [localhost:8783/](http://localhost:8783/), if this does not happen automatically
