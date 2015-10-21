(function() {
    $(function() {
        var socket = io(),
            $input = $('.msg-input'),
            $form = $('.form-input');

        $form.submit(function () {
            socket.emit('USER_MESSAGE', $input.val());
            socket.emit('PRIVATE_MESSAGE', 'CoolKid', $input.val());
            $input.val('');
            return false;
        });

        socket.on('USER_MESSAGE', function (msg) {
            console.log(msg);
            $('.div-chat-messages').append('<div class="message-line"><div class="user-avatar"><img src="img/avatars/coolkid.jpg" class="img-user-avatar"></div>' +
                '<div class="user-message-cell clearfix"><div class="user-message"><p class="message-content">' + msg + '</p><div class="ribbon"></div></div></div></div>');
        });

        socket.on('PRIVATE_MESSAGE', function (msg) {
            //$('#messages').append('<li><span style="color: orangered; font-size: 10px;">' + msg + '</span></li>');
            //$('#messages').append($('<li>').text(msg));
        });

        socket.on('SYSTEM_MESSAGE', function (msg) {
            //$('#messages').append('<li><span style="color: orangered; font-size: 10px;">' + msg + '</span></li>');
        });
    });
}());
