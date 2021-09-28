package io.github.nicolasdesnoust.xyzingenierie.core.configuration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class DelayInterceptor implements HandlerInterceptor {
    
    private static final int DELAY_IN_SECONDS = 3;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        try {
            Thread.sleep(DELAY_IN_SECONDS * 1000L);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}