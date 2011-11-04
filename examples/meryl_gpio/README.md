Meryl GPIO example
------------------

To showcase what can be accomplished with NodeJS and the Fox, we leverage Meryl (a minimalistic web framework), Connect (for serving static files) and Socket.IO (for bidirectional communication with web clients).

Before starting the example, connect a pushbutton across J7.3 and J7.39 (+3.3V), and use a small resistance to connect a LED from J7.4 to J7.1 (GND).

On first usage, type

        make deps

in the example directory to download and install the needed dependencies.

The example is executed as

        ./app.js

Wait a few seconds for the 'socket.io started' message to appear on console, then point your browser to port 8080 of the Fox and enjoy.

Push the button: the green led on the page will light up instantly. Click on the red leds on the page, and the real led will react at once - retroacting a change on the page, too.

For more fun, open multiple browser windows on the same page and watch as they synchronize in real time.
