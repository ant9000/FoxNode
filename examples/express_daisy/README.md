Express Daisy example
------------------

In this example we make use of Express, a complete web framework for NodeJS, together with Socket.IO, the dazzling client-server bidirectional communication library.

The HTML presentation for Daisy5 and Daisy11 is implemented with a custom jQuery plugin.

Before starting the example, attach a Daisy5 to connector D5 on your Daisy1 and a Daisy11 to connector D2.

On first usage, type

        npm bundle

in the example directory to download and install the needed dependencies.

The example is executed as

        ./app.js

Wait a few seconds for the 'socket.io started' message to appear on console, then point your browser to port 3000 of the Fox and enjoy.

Push the buttons on your Daisy5: the corresponding green leds on the page will light up instantly. Click on the red leds on the page, and the Daisy11 leds will react immediately - retroacting a change on the page, too.

For more fun, point multiple browser windows to the same page and watch them as they synchronize in real time.
