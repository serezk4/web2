/**
 * Function to insert a result from the server into the table.
 * @author serezk4
 * @version 1.0
 */

$(document).ready(function() {
    const y = $('#y');
    let selectedR = null;

    const form = $('#form');
    const insert = $('#resultTable tbody');

    const canvas = $('graph')

    canvas.on('click', function(event) {
        alert('click');
        const rect = this.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;

        // Преобразование координат в систему координат графика
        const x = (canvasX - this.width / 2) / (config.radius / rValue);
        const y = (this.height / 2 - canvasY) / (config.radius / rValue);

        // Отправляем координаты на сервер
        alert(x + " " + y)
    });

    $('.r-button').on('click', function () {
        selectedR = parseFloat($(this).val());
        $('.r-button').removeClass('selected');
        $(this).addClass('selected');
    });

    form.on('submit', function (event) {
        event.preventDefault();

        const xValue = parseFloat($('input[name="x"]:checked').val());
        const rValue = parseFloat($('input[name="r"]:checked').val());
        const yValue = parseFloat(y.val());

        $.ajax({
            url: `controller?x=${xValue}&y=${yValue}&r=${selectedR}&format=params`,
            type: 'GET',
            contentType: 'text/html',
            success: function (data) {
                insertPoint(xValue, yValue, rValue);
                insert.prepend(data);
            },
            error: function () {
                alert('Error');
            }
        });

        refresh(selectedR);
    });
});