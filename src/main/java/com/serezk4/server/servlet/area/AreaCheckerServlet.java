package com.serezk4.server.servlet.area;

import com.serezk4.server.servlet.area.response.ValidateCoordinatesResponse;
import com.serezk4.server.servlet.area.util.CoordinatesChecker;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Area checker servlet.
 *
 * @author serezk4
 * @version 1.0
 * @since 1.0
 */
public final class AreaCheckerServlet extends HttpServlet {
    /**
     * Processes the request.
     * @param request - request
     * @param response - response
     * @throws ServletException when servlet error occurs
     * @throws IOException when I/O error occu rs
     */
    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final long start = System.nanoTime();

        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        boolean hit = CoordinatesChecker.check(x, y, r);

        HttpSession session = request.getSession();
        List<ValidateCoordinatesResponse> results = (List<ValidateCoordinatesResponse>) session.getAttribute("results");
        if (results == null) results = new ArrayList<>();
        results.add(new ValidateCoordinatesResponse(x, y, r, hit, System.nanoTime() - start));
        session.setAttribute("results", results);

        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}