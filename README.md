# Home agency style reen

## If you haven't node.js, gulp and bower

Install NVM on Ubuntu

    sudo apt-get update
    sudo apt-get install build-essential libssl-dev
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash

Reopen terminal, and install node.js

    nvm install node
    nvm alias default node

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

And open build/inde.html in a browser.

## For deploy

    gulp deploy
