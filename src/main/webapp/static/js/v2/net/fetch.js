/**
 * Function to insert a result from the server into the table.
 * @author serezk4
 * @version 1.0
 */

$(document).ready(function() {
    const contextPath = '${pageContext.request.contextPath}';

    const y = $('#y');
    let selectedR = null;

    const form = $('#form');
    const insert = $('#resultTable tbody');

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
            url: contextPath + `/controller?x=${xValue}&y=${yValue}&r=${selectedR}`,
            type: 'POST',
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