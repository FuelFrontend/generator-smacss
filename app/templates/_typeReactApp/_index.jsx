<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= site_name %></title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

    <!-- CSS files -->
    <link rel="stylesheet" href="css/master.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
</head>
<body>
    <div id="app"></div>

    <script type="text/jsx">
      var App = React.createClass({
        render: function() {
          return (
            <h1>Welcome, You look great today!</h1>
          )
        }
      });

      React.render(<App/>, document.getElementById('app'));
    </script>

    <!-- JS files -->
    <script src="js/bower.js" type="text/javascript" charset="utf-8"></script>
    // <script src="js/application.js" type="text/javascript" charset="utf-8"></script>
    <!-- endbuild -->
</body>
</html>
