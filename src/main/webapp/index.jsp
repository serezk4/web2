<%@ page import="com.serezk4.server.servlet.area.response.ValidateCoordinatesResponse" %>
<%@ page import="java.util.List" %><%--
@author serezk4
@version 1.0
@since 1.0
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <style>
        @font-face {
            font-family: 'Monofonto';
            src: url('static/font/monofonto.otf') format('opentype');
        }

        body {
            cursor: url('static/cursor/fnv.cur'), auto;
        }
    </style>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEB Lab1</title>

    <link rel="icon" href="static/img/itmo-duck-large-black-bg.png" type="image/x-icon">
    <link rel="stylesheet" href="static/css/v2/normalize.css">
    <link rel="stylesheet" href="static/css/v2/style.css">
</head>
<body>
<div class="container">
    <!--  HEADER  -->
    <header>
        <div class="credentials">

            <ul>
                <li>Веб-программирование 1 @ <a href="variant.html">Вариант 21106</a></li>
                <li>Выполнил <a href="https://my.itmo.ru/persons/412934">Дорохин Сергей Константинович</a>
                    @ <a href="https://github.com/serezk4">github</a></li>
                <li>переключиться на: <a href="index0.html">v1.0</a>, <a href="index.html">v2.0 (текущая)</a></li>
            </ul>
        </div>
    </header>

    <!--  MAIN  -->
    <main>
        <table>
            <tr>
                <td>
                    <div class="canvasPlaceholder">
                        <canvas id="graph" width="500" height="500" class="graph"></canvas>
                    </div>
                </td>
                <td>
                    <form action="controller" method="get">
                        <!-- X Radio -->
                        <div class="inputPlaceholder">
                            <label for="x" class="fieldName">X:</label><br>
                            <div id="x" class="radio-group controlPlaceholder">
                                <input type="radio" name="x" id="x-4" value="-4">
                                <label for="x-4">-4</label>
                                <input type="radio" name="x" id="x-3" value="-3">
                                <label for="x-3">-3</label>
                                <input type="radio" name="x" id="x-2" value="-2">
                                <label for="x-2">-2</label>
                                <input type="radio" name="x" id="x-1" value="-1">
                                <label for="x-1">-1</label>
                                <input type="radio" name="x" id="x0" value="0" checked>
                                <label for="x0">0</label>
                                <input type="radio" name="x" id="x1" value="1">
                                <label for="x1">1</label>
                                <input type="radio" name="x" id="x2" value="2">
                                <label for="x2">2</label>
                                <input type="radio" name="x" id="x3" value="3">
                                <label for="x3">3</label>
                                <input type="radio" name="x" id="x4" value="4">
                                <label for="x4">4</label>
                            </div>
                        </div>

                        <!-- Y Text Input -->
                        <div class="inputPlaceholder">
                            <label for="y" class="fieldName">Y:</label><br>
                            <input type="text"
                                   id="y"
                                   name="y"
                                   value="0" min="-5" max="3"
                                   placeholder="&#8722;3 &le; y &le; 5"
                                   step="0.001" required
                                   class="controlPlaceholder">
                        </div>

                        <!-- R Radio Buttons -->
                        <div class="inputPlaceholder">
                            <label for="r" class="fieldName">R:</label><br>
                            <div id="r" class="radio-group controlPlaceholder">
                                <input type="radio" name="r" id="r1" value="1">
                                <label for="r1">1</label>
                                <input type="radio" name="r" id="r1.5" value="1.5">
                                <label for="r1.5">1.5</label>
                                <input type="radio" name="r" id="r2" value="2">
                                <label for="r2">2</label>
                                <input type="radio" name="r" id="r2.5" value="2.5">
                                <label for="r2.5">2.5</label>
                                <input type="radio" name="r" id="r3" value="3">
                                <label for="r3">3</label>
                            </div>
                        </div>

                        <button id="submit" type="submit" class="btn-submit"><strong>Отправить</strong></button>
                    </form>
                </td>
            </tr>
        </table>

        <div id="results">
            <h2><strong>~> Результаты<span class="cursor">_</span></strong></h2>
            <table id="resultTable">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время выполнения (нс)</th>
                </tr>
                </thead>
                <tbody>
                <%
                    List<ValidateCoordinatesResponse> results = (List<ValidateCoordinatesResponse>) session.getAttribute("results");
                    if (results != null) {
                        for (ValidateCoordinatesResponse res : results) {
                %>
                <tr>
                    <td><%= res.x() %></td>
                    <td><%= res.y() %></td>
                    <td><%= res.r() %></td>
                    <td><%= res.result() ? "✓" : "✗" %></td>
                    <td><%= res.bench() %></td>
                </tr>
                <%
                        }
                    }
                %>
                </tbody>
            </table>
        </div>
    </main>
</div>

<!-- JS Scripts -->

<script src="static/js/v2/lib/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="./static/js/v2/plot/update.js"></script>
<script type="text/javascript" src="./static/js/v2/plot/plot.js"></script>
<script type="text/javascript" src="./static/js/v2/net/fetch.js"></script>

<!-- JS Scripts -->

</body>
</html>

