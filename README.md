# Table Tennis Scoring Sample

This is a sample application for the tribe platform.

## Install and Run

```
git clone https://github.com/danderson00/score.git
cd score
npm i
npm start
```

Then open two browser tabs to http://localhost:1678/.

The application is intended to run on a mobile device. If you're using Chrome, enable device mode
in the developer tools. Even better, open port 1678 in your firewall and hit it from your mobile phone.

## Overview

There are four main folders in the scoring application:

---|---
vocabulary | Rx expressions that can be reused in other expressions throughout the app
panes      | User interface components for the application
facets     | Facets allow stitching together multiple expressions and events into discrete components
flows      | Flows define the navigation flow for the app

For a more detailed overview of the concepts behind the application, check 
[this post]().