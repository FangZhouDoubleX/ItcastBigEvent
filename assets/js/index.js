$(function () {
    getUserInfo();

    $('#btnLogout').on('click', function () {
        layer.confirm('是否要退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空token
            localStorage.removeItem('token');
            // 重定向到登录页
            location.href = '/login.html';
            // layui自带的关闭设置
            layer.close(index);
        });
    });
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        },
    })
}

function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username;
    // 用名字替换死的文字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像渲染头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 没头像渲染文本头像
        $('.layui-nav-img').hide();
        // 获取字符串第一个字符可以用[0]
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}