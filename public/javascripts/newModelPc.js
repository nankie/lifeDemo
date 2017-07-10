$(document).ready(function(){
    showComments();
});

//获取path中的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]);
    return null;
}

//评论的集合
var comments;

//加载评论
function showComments(){
    $.ajax({
        url:'/getComments',
        type:'get',
        data:{mark:GetQueryString('mark')},
        success:function (data) {
            if(data.success == 1){
                //迭代评论
                comments = data.result;
                $('#commentsList').html('');
                for(var i in comments){
                    var comment = comments[i];
                    //TODO 在此处判断是文章评论还是回复评论
                    var fromUser = comment.FromUser;
                    var personImgUrl = fromUser.PersonImg==''||fromUser.PersonImg==null ? 'images/testtouxiang.jpg' : fromUser.PersonImg;
                    var str;
                    if(comment.Type == 1){
                        str = '<div class="comment"><img src=" ' + personImgUrl + ' ">' +
                            '<div class="comment_mark">' + fromUser.Nickname + '&nbsp;&nbsp;&nbsp;' + comment.Date + '</div>' +
                            '<div class="comment_bar"><a class="comment_reply">回复</a>&nbsp;|&nbsp;<a class="comment_good">点赞</a></div>'+
                            '<div class="comment_content">' + comment.Content + '</div></div>';
                    }else{
                        str = '<div class="comment">'+
                            '<img src="images/testtouxiang.jpg">'+
                            '<div class="comment_mark">' + fromUser.Nickname + '&nbsp;&nbsp;&nbsp;' + comment.Date + '</div>'+
                            '<div class="comment_bar">'+
                            '<a class="comment_reply">回复</a>&nbsp;|&nbsp;'+
                            '<a class="comment_good">点赞</a>'+
                            '</div>'+
                            '<div class="reply_content">回复#'+
                            '<span>'+comment.ToComment.FromUser.Nickname+'</span>:'+
                            '<div class="content">'+comment.Content+'</div>'+
                            '<div class="commentTo">'+
                            '<span>'+comment.ToComment.FromUser.Nickname + '&nbsp;' + comment.ToComment.Date +'</span>'+
                            '<div>'+comment.ToComment.Content+'</div>'+
                            '</div></div></div>';
                    }
                    $('#commentsList').append(str);
                    comment_bound(comment);
                    if(i<comments.length-1){
                        $('#commentsList').append('<div class="comment_line"></div>');
                    }
                }
            } else if(data.success == 404){
                $('#commentsList').html('快来抢沙发！');
            } else{
                $('#commentsList').html('系统繁忙，请稍后刷新。');
            }
        }
    });
}

//回帖变换按钮
$('#btn_sendComment').click(function(){
    //切换按钮
    $(this).hide();
    $('#commentBlank ul li .sendHot').show().click(function(){sendComment(1)});
    $('#commentBlank ul li .sendDown').show().click(function(){sendComment(2)});

});

//发送回贴的方法 参数1为加柴 参数2为降雨
function sendComment(destination){
    var comment = $('#commentBlank ul li textarea').val();
    //TODO 后期加正则验证，这先简单过滤
    if(comment==''||comment==null){
        alert('请输入评论！');
        return;
    }
    $.ajax({
        url:'/user/saveComment',
        type:'post',
        data:{content:comment,mark:GetQueryString('mark'),type:1,destination:destination},
        success:function(data){
            if(data.success == 1){
                //清空输入框
                $('#commentBlank ul li textarea').val('');
                $('#btn_sendComment').show();
                $('#commentBlank ul li .sendHot').hide();
                $('#commentBlank ul li .sendDown').hide();
                showComments();
            }else{
                alert('评论失败');
            }
        }
    });
}

function comment_bound(){
    $('.comment_reply').click(function(){
        $('.reply_bar').remove();
        //第几条评论
        var commentIndex = $(this).parent().parent('.comment').index()/2;
        $('.comment:eq('+commentIndex+')').append('<div class="reply_bar">'+
        '<ul>'+
        '<li><img src="images/testtouxiang.jpg"></li>'+
        '<li><textarea></textarea></li>'+
        '<li><div class="btn_sendReply">发布</div></li>'+
        '</ul>'+
        '</div>');
        $('.btn_sendReply').click(function(){
            var comment = $('.reply_bar ul li textarea').val();
            //TODO 后期加正则验证，这先简单过滤
            if(comment==''||comment==null){
                alert('请输入评论！');
                return;
            }
            var i = comments[commentIndex];
            $.ajax({
                url:'/user/saveComment',
                type:'post',
                data:{content:comment,mark:GetQueryString('mark'),type:2,toCommentId:comments[commentIndex]._id},
                success:function(data){
                    if(data.success == 1){
                        //清空输入框
                        showComments();
                        alert('评论成功！');
                    }else{
                        alert('评论失败');
                    }
                }
            });
        });
    });
}