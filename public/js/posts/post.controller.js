(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller(PostCtrl);

    PostCtrl.$inject = ['$scope','AuthService','ActiviesFactory','PostsFactory','CommentsFactory'];

    function PostCtrl($scope,AuthService,ActiviesFactory,PostsFactory,CommentsFactory){
        var vm = this;
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
                    $scope.showSimpleToast('Sending...');
                }
                else if(!isValid){
                    $scope.showSimpleToast('Invalid comment');
                }
            }
        }

        function downvote(post){
            if (!AuthService.isAuthenticated()) {
                $scope.showLoginDialog();
            }
            else {
                if(post.upvotes.indexOf(AuthService.currentUser.id) > -1) {
                    $scope.showSimpleToast('Post already upvoted !');
                }
                else{
                    PostsFactory.downvote(post)
                        .then(function successDownvoteCallback(response){
                            if (response.status == "ALREADY_DOWNVOTED") {
                                $scope.showSimpleToast('Post already downvoted !');
                            }
                            else {
                                vm.post.downvotes.push(AuthService.currentUser.id);
                                $scope.showSimpleToast('Post downvoted !');
                                ActiviesFactory.updateFeed();
                            }
                        }, function errorDownvoteCallback() {
                            $scope.showSimpleToast('Error during downvote');
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
                    $scope.showSimpleToast('An error occured');
                });
        }

        function showAddCommentForm(){
            if (!AuthService.isAuthenticated()) {
                $scope.showLoginDialog();
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
                    $scope.showSimpleToast('Comment added !');
                    ActiviesFactory.updateFeed();
                    CommentsFactory.getComments(vm.post)
                }, function errorUploadComment() {
                    vm.isCommentsLoading = false;
                    $scope.showSimpleToast('An error occured');
                });
        }

        function upvote(post){
            if (!AuthService.isAuthenticated()) {
                $scope.showLoginDialog();
            }
            else {
                if(post.upvotes.indexOf(AuthService.currentUser.id) > -1) {
                    $scope.showSimpleToast('Post already upvoted !');
                }
                else{
                    PostsFactory.upvote(post)
                        .then(function successUpvoteCallback(response){
                            if (response.status == "ALREADY_UPVOTED") {
                                $scope.showSimpleToast('Post already upvoted !');
                            }
                            else {
                                vm.post.upvotes.push(AuthService.currentUser.id);
                                $scope.showSimpleToast('Post upvoted !');
                                ActiviesFactory.updateFeed();
                            }
                        }, function errorUpvoteCallback() {
                            $scope.showSimpleToast('Error during upvote');
                        });
                }
            }
        }
    }
})();