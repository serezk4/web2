package com.serezk4.server.servlet;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Optional;

/**
 * Controller servlet.
 * Redirects to the area check servlet if all parameters are present.
 *
 * @author serezk4
 * @version 1.0
 * @since 1.0
 */
public final class ControllerServlet extends HttpServlet {
    /**
     * Processes the request.
     * @param request - request
     * @param response - response
     * @throws ServletException when servlet error occurs
     * @throws IOException when I/O error occurs
     */
    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        String mode = request.getParameter("mode");

        log("x: " + x + ", y: " + y + ", r: " + r + ", mode: " + mode);

        RequestDispatcher dispatcher;
        if (x != null && y != null && r != null) dispatcher = request.getRequestDispatcher("/areaCheck");
        else if (mode != null && mode.equalsIgnoreCase("v2")) dispatcher = request.getRequestDispatcher("/index2.jsp");
        else dispatcher = request.getRequestDispatcher("/index.jsp");
        dispatcher.forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}