Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('private', {path: '/private',});
    this.route('about', {path: '/about',});
    this.route('testsocket', {path: '/testsocket',});
    this.route('info',{path: '/info'});
    this.route('drawdemo',{path: '/drawdemo'});

});

Router.plugin('ensureSignedIn', {
  only: ['info']
});
