$(function () {
    // 点击去注册去登录互相切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 自定义layui验证
    const form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value 是表单的值，再获取pwd跟他进行比较
            // []是属性选择器
            let pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                layer.msg('两次密码不一致！');
                // return '两次密码不一致！';
            };
        },
    });

    // 监听表单提交事件并且把注册表单提交给后端
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 把要传入的数据拿出来
        data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val(),
        }
        // 调用接口
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function (res) {
            // 先判断请求是否成功
            if (res.status !== 0) {
                // return console.log('注册失败', res.message);
                return layer.msg('注册失败,' + res.message);
            }
            layer.msg(res.message);
            // alert(res.message);
        });
    });

    // 根据用户名和密码进行登录
    // 登录是对表单的监听
    $('#form_login').on('submit', function (e) {
        // 阻止默认跳转
        e.preventDefault();
        // 看文档写
        // 注册有一个确认密码的框，所以不能用serialize()全部获取
        $.post('http://api-breakingnews-web.itheima.net/api/login', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                // return res.message;
            };
            // 请求成功之后把返回的token存在本地
            localStorage.setItem('token', res.token);
            // return res.message;
            return layer.msg(res.message);
        })
    });
})