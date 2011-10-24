FoxNode - a NodeJS library for interacting with FoxBoard hardware
=================================================================

FoxNode is composed of two related items:

-  acme.gpio: a [GPIO](http://www.kernel.org/doc/Documentation/gpio.txt) access library for NodeJS, with user space interrupt support
-  acme.daisy: to simplify usage of Daisy5 and Daisy11 with NodeJS, built on top of acme.gpio

The API for GPIO
----------------

First step, create a new GPIO pin object:

        var pin = new GPIO(name,direction,value);

where

- <code>name</code> is any of the Fox/Daisy connectors, i.e. J6.X, J7.X, D1.X, ..., D8.X,
  or a kernel id number
- <code>direction</code> is one of "in" or "out"
- <code>value</code> can be 0 or 1

Direction and value can be read and changed after initialization
with the following methods:

        pin.direction()           # get
        pin.direction(direction)  # set

        pin.value()               # get
        pin.value(value)          # set

Upon creation, the pin initializes the underlying
hardware in order to react to state changes via 
interrupts. NodeJS is informed of such changes
using a 'data' event, that can be used like this:

        pin.on('data',function(data){
          console.log(
            'Pin:   '+data.name +', '+
            'Value: '+data.value+', '+
            'Count: '+data.count
          );
        });

There is also a read-only property

        pin.count

representing the number of value changes since
pin instantiation.

It is possible to stop the event generation with

        pin.pause();

and to restart it afterwards with

        pin.resume();

The API for Daisy5
------------------

In order to instantiate a new Daisy5, the code is

        var daisy5 = new acme.daisy.Daisy5(port);

where <code>port</code> is one of 'D2' or 'D5'.

Daisy5 is configured as 8 input pins, readable as

        daisy5.P1
        daisy5.P2
        ...
        daisy5.P8

Whenever one of the buttons changes state, the object
will emit a 'data' event:

        daisy5.on('data',function(data){
          console.log(
            'Port:   '+data.port+', '+
            'Button: '+data.button+', '+
            'Value:  '+data.value+', '+
            'Count:  '+data.count
          );
        });


The API for Daisy11
-------------------

In order to instantiate a new Daisy11, the code is

        var daisy11 = new acme.daisy.Daisy11(port);

where <code>port</code> is one of 'D2' or 'D5'.

Daisy11 is configured as 8 output pins, readable and
writable as

        daisy11.L1
        daisy11.L2
        ...
        daisy11.L8

Whenever one of the leds changes state, the object
will emit a 'data' event:

        daisy11.on('data',function(data){
          console.log(
            'Port:  '+data.port+', '+
            'Led:   '+data.led+', '+
            'Value: '+data.value+', '+
            'Count: '+data.count
          );
        });
