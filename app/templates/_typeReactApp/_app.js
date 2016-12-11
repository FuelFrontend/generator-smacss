/** @jsx React.DOM */
var React    = window.React = require('react'), // assign it to winow for react chrome extension
    Header   = require('./header'),
    Content  = require('./router'),
    App;


App = React.createClass({
  render: function () {
      return <div>
      <div>
             <h1>React Seed -- Hello World Program </h1>
         </div>
      </div>;
  }
});

App.start = function () {
  React.renderComponent(<App/>, document.getElementById('app'));
};

module.exports = window.App = App;
