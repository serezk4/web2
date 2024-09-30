$(document).ready(function() {
    let rValue = 1;

    const rButton = $(".r-button");
    const yInput = $("#y");

    const insert = $('#resultTable tbody');
    const canvas = document.getElementById('graph');

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const rectX = event.clientX - rect.left;
        const rectY = event.clientY - rect.top;

        let realX = (rectX - canvas.width / 2) / (canvas.width / 2) * rValue;
        let realY = (canvas.height / 2 - rectY) / (canvas.height / 2) * rValue;

        const constrX = applyXConstraints(realX);
        const constrY = applyYConstraints(realY);

        $.ajax({
            url: `controller?x=${constrX}&y=${constrY}&r=${rValue}&format=params`,
            type: 'GET',
            contentType: 'text/html',
            success: function (data) {
                insertPoint(constrX, constrY, rValue);
                insert.prepend(data);
            },
            error: function () {
                alert('Error');
            }
        });
    });

    function applyXConstraints(x) {
        const possibleXValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
        return possibleXValues.reduce((prev, curr) =>
            Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
        );
    }

    function applyYConstraints(y) {
        if (y < -5) y = -5;
        if (y > 3) y = 3;
        return Math.round(y * 1000) / 1000;
    }

    setDefaults();

    function setDefaults() {
        $('input[name="x"][value="0"]').prop('checked', true);
        $('#y').val(0);
        setR(1);
    }

    function setR(r) {
        rValue = r;
        refresh(rValue);

        rButton.removeClass("selected");
        $('.r-button[value="' + r + '"]').addClass("selected");
    }

    rButton.on("click", function () {
        setR($(this).val());
    });

    yInput.on('input', function() {
        yInput.val(yInput.val().replace(/[^0-9.,-]/g, ''));
        yInput.val(yInput.val().replace(/,/g, '.'));

        if (yInput.val() && (parseFloat(yInput.val()) < -3 || parseFloat(yInput.val()) > 5)) {
            yInput.val(parseFloat(yInput.val()) > 5 ? 5 : -3);
        }

        if (yInput.val().indexOf('.') !== -1 && yInput.val().split('.')[1].length > 3) {
            yInput.val(yInput.val().substring(0, yInput.val().indexOf('.') + 4));
        }

        if ((yInput.val().match(/\./g) || []).length > 1) {
            yInput.val(yInput.val().substring(0, yInput.val().lastIndexOf('.')));
        }

        if ((yInput.val().match(/\./g) || []).length === 1 && yInput.val().indexOf('.') === 0) {
            yInput.val('0' + yInput.val());
        }
    });
});