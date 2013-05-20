Scanning other websites with QUAIL
==================================

Since QUAIL is now a jQuery plugin, it's no longer possible to run it natively in PHP. If you would like to scan other sites (without, say, getting your own javascript on their page a-la Google Analytics), then you'll need to run JavaScript on your backend.

QUAIL already does this sort of thing in our continuous integration service on `Travis.org <https://travis-ci.org/kevee/quail/builds/7219577>`_ using `PhantomJS <http://phantomjs.org/>`_. PhantomJS is a full browser implementation that can do JavaScript tests and basically works like a browser.

Others have used QUAIL in combination with `Cheerio for NodeJS <https://github.com/MatthewMueller/cheerio>`_. Cheerio is an implementation of jQuery for NodeJS; however, certain tests that work with user interactions or JavaScript events will not work.
