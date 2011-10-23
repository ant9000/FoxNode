FoxNode - a NodeJS library for interacting with FoxBoard hardware
=================================================================

-  acme.gpio
   GPIO access library for NodeJS, including user space interrupt support
-  acme.daisy
   simplifies usage of Daisy5, Daisy11 with NodeJS; built on top of acme.gpio

The API for GPIO
----------------

        var pin = new GPIO(name,direction,value);

- name: any of the Fox/Daisy connectors, i.e. J6.X, J7.X, D1.X, ..., D8.X,
  or a kernel id number
- direction: "in" or "out"
- value: 0 or 1

The following methods are defined:

        pin.direction()           # get
        pin.direction(direction)  # set

        pin.value()               # get
        pin.value(value)          # set

There is also a read-only property

        pin.count

representing the number of value changes since pin
instantiation.

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

It is possible to stop the event generation with

        pin.pause();

and to restart it afterwards with

        pin.resume();

The API for Daisy5
------------------

TODO

The API for Daisy11
-------------------

TODO
