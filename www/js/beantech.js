//initialize app
var beantech = new Framework7({
    //disable cache for development
    cache: false,

    // Default title for modals
    modalTitle: 'Beantech',

    //enable Material theme
    material: true,

    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        beantech.showIndicator();
    },
    onAjaxComplete: function (xhr) {
      beantech.hideIndicator();
    },
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = beantech.addView('.view-main', {

}); 

// Callbacks for specific pages when it initialized
beantech.onPageInit('intro', function (page) {
  // Do something here for "about" page
  beantech.alert("Welcome!");
});

// TicTacToe Game Code

/*-----TicTacToe Game Code ends here-----*/


