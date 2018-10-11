/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

         //Test allFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         // Test url of each feed in allFeeds is defined and not empty
         it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

         //Test name of each feed in allFeeds is defined and not empty
         it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            }
         });
    });


    //The menu suite
    describe('The menu', function() {

         //Test the menu is hidden by default
         it('is hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
         })

          //Test the menu is toggled on and off by clicking
          it('toggle on and off', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
          });
    });
        

         

    //The initial entries suite
    describe('Initial Entries', function(){

         //At least a single .entry element within the .feed container
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('complete work', function(){
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
         });
    });
        

    //The new feed selection suite
    describe('New Feed Selection', function(){
        const feed = document.querySelector('.feed');
        const firstFeed = [];

         //The content changes when the new feed is loaded     
         beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
         });

         it('content changes', function(){
            Array.from(feed.children).forEach(function(entry, index){
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
         });
    });
        
}());
