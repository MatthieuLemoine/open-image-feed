(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller('PostController',PostController);

    PostController.$inject = ['$scope','AuthService','UserModel','ActivitiesFactory','PostsFactory','CommentsFactory','ToastFactory'];

    function PostController($scope,AuthService,UserModel,ActivitiesFactory,PostsFactory,CommentsFactory,ToastFactory){
        var vm = this;
        vm.post = $scope.post;
        vm.showComments = false;
        vm.isCommentsLoading = false;
        vm.showAddComment = false;
        vm.newComment = {};
        vm.toggleComments = toggleComments;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.showAddCommentForm = showAddCommentForm;
        vm.addComment = addComment;

        ////////////

        function addComment(isValid){
            if (isValid && !vm.isCommentsLoading) {
                uploadComment({content : vm.newComment.content,post: vm.post._id});
            }
            else{
                if(vm.isCommentsLoading){
                    ToastFactory.showSimpleToast('Sending...');
                }
                else if(!isValid){
                    ToastFactory.showSimpleToast('Invalid comment');
                }
            }
        }

        function downvote(post){
            if (!AuthService.isAuthenticated()) {
                AuthService.showLoginDialog();
            }
            else {
                if(post.downvotes.indexOf(UserModel.currentUser.id) > -1) {
                    ToastFactory.showSimpleToast('Post already downvoted !');
                }
                else{
                    PostsFactory.downvote(post)
                        .then(function successDownvoteCallback(response){
                            if (response.status == "ALREADY_DOWNVOTED") {
                                ToastFactory.showSimpleToast('Post already downvoted !');
                            }
                            else {
                                vm.post.downvotes.push(UserModel.currentUser.id);
                                ToastFactory.showSimpleToast('Post downvoted !');
                                ActivitiesFactory.updateFeed();
                            }
                        }, function errorDownvoteCallback() {
                            ToastFactory.showSimpleToast('Error during downvote');
                        });
                }
            }
        }

        function getComments(post){
            vm.isCommentsLoading = true;
            CommentsFactory.getComments(post)
                .then(function successGetComments(response) {
                    vm.post.comments = response;
                    vm.isCommentsLoading = false;
                }, function errorGetComments() {
                    vm.isCommentsLoading = false;
                    ToastFactory.showSimpleToast('An error occured');
                });
        }

        function showAddCommentForm(){
            if (!AuthService.isAuthenticated()) {
                AuthService.showLoginDialog();
            }
            else {
                vm.showAddComment = true;
            }
        }

        function toggleComments(post){
            vm.showComments = ! vm.showComments;
            if(vm.showComments){
                getComments(post);
            }
            else{
                vm.showAddComment = false;
            }
        }

        function uploadComment(comment) {
            vm.isCommentsLoading = true;
            CommentsFactory.addComment(comment)
                .then(function successUploadComment(){
                    vm.isCommentsLoading = false;
                    vm.newComment = {};
                    vm.showAddComment = false;
                    ToastFactory.showSimpleToast('Comment added !');
                    ActivitiesFactory.updateFeed();
                    getComments(vm.post);
                }, function errorUploadComment() {
                    vm.isCommentsLoading = false;
                    ToastFactory.showSimpleToast('An error occured');
                });
        }

        function upvote(post){
            if (!AuthService.isAuthenticated()) {
                AuthService.showLoginDialog();
            }
            else {
                if(post.upvotes.indexOf(UserModel.currentUser.id) > -1) {
                    ToastFactory.showSimpleToast('Post already upvoted !');
                }
                else{
                    PostsFactory.upvote(post)
                        .then(function successUpvoteCallback(response){
                            if (response.status == "ALREADY_UPVOTED") {
                                ToastFactory.showSimpleToast('Post already upvoted !');
                            }
                            else {
                                vm.post.upvotes.push(UserModel.currentUser.id);
                                ToastFactory.showSimpleToast('Post upvoted !');
                                ActivitiesFactory.updateFeed();
                            }
                        }, function errorUpvoteCallback() {
                            ToastFactory.showSimpleToast('Error during upvote');
                        });
                }
            }
        }
    }
})();
